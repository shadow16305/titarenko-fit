import * as qs from "qs-esm";

import { Access } from "payload";
import { User } from "@/payload-types";
import { checkRole } from "./check-role";

/**
 * Access control for Orders based on the user's role and the query string
 */
export const adminsOrOrderedByOrPaymentId: Access = ({ req }) => {
  const typedUser = req.user as User | undefined;
  const isAdmin = checkRole(["admin"], typedUser);

  const referer = req.headers?.get("referer") || "";
  const isAdminPanelRequest = referer.includes("/admin");

  if (isAdmin && isAdminPanelRequest) {
    return true;
  }

  const searchParams = req.searchParams;
  const where = searchParams.get("where");

  const query = where ? qs.parse(where) : {};
  const paymentIntentID = (query.stripePaymentIntentID as qs.ParsedQs)
    ?.equals as string | undefined;

  if (paymentIntentID) {
    return {
      and: [
        {
          stripePaymentIntentID: {
            equals: paymentIntentID,
          },
        },
      ],
    };
  }

  if (!typedUser?.id) {
    return false;
  }

  return {
    and: [
      {
        orderedBy: {
          equals: typedUser.id,
        },
      },
    ],
  };
};

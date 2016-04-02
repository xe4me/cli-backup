import {FormDefinition} from "../formDefinition";

// TODO: This will either come from database/nodeJs service or defaulted somewhere
export var _buyBackFormDef = {
  id: "Buy Back Form",
  version: "0.0.1",
  path: "/",
  status: "NEW",
  blocks : [
    {
      blockType: "LandingPage",
      blockLayout: "PAGE",
      path: "pages/",
      page: { pageId: null, nextPageId: "details", prevPageId: null },
      blocks: [
        {
          blockType: "ContentBlock",
          blockLayout: "INLINE",
          path: "",
          custom : {
            id: "BuyBackTitle",
            label: "You're about to request to exercise your buyer of last resort facility."
          }
        },
        {
          blockType: "ContentBlock",
          blockLayout: "INLINE",
          path: "",
          custom : {
            id: "BuyBasckTitle",
            label: "You'reasdasd exercise your buyer of last resort facility."
          }
        },
      ]
    },
    {
      blockType: "DetailsPage",
      blockLayout: "PAGE",
      path: "pages/",
      page: { pageId: "details", nextPageId: "confirmation", prevPageId: null },
      blocks: [
        {
          blockType: "PlannerDetailsBlock",
          blockLayout: "INLINE",
          path: "",
          custom: {
            id: "planner1",
            label: "First name"
          }
        },
        {
          blockType: "MultipleComponentsBlock",
          blockLayout: "INLINE",
          path: "",
          custom: {
            practice: {
              id: "MultiPracticeName",
              label: "Multi Practice name"
            },
            payee: {
              id: "MultiPayeeID",
              label: "Payee ID"
            }
          }
        },
        {
          blockType: "NestedBlock",
          blockLayout: "INLINE",
          path: "",
          blocks: [
            {
              blockType: "ContentBlock",
              blockLayout: "INLINE",
              path: "",
              custom: {
                id: "NestedContentBlock",
                label: "Nested content block"
              }
            },
            {
              blockType: "PlannerDetailsBlock",
              blockLayout: "INLINE",
              path: "",
              custom: {
                id: "NestedPlanner",
                label: "Nested Planner Details"
              }
            },
            {
              blockType: "NestedBlock",
              blockLayout: "INLINE",
              path: "",
              blocks: [
                {
                  blockType: "ContentBlock",
                  blockLayout: "INLINE",
                  path: "",
                  custom: {
                    id: "NestedContentBlock2",
                    label: "Nested content block2"
                  }
                },
                {
                  blockType: "PlannerDetailsBlock",
                  blockLayout: "INLINE",
                  path: "",
                  custom: {
                    id: "NestedPlanner2",
                    label: "Nested Planner Details2"
                  }
                },
              ],
              custom: {
                id: "ParentPayeeId2",
                label: "Parent Payee Id2"
              }
            },

          ],
          custom: {
            id: "ParentPayeeId",
            label: "Parent Payee Id"
          }
        },
      ]
    },
    {
      blockType: "ConfirmationPage",
      blockLayout: "PAGE",
      path: "pages/",
      page: { pageId: "confirmation", nextPageId: null, prevPageId: "details" },
      custom: {
        id: "confirmationBuyBack",
        label: "Your buyer of last resort request has been successfully submitted."
      }
    }
  ]
};

export class BuyBackFormDefinition extends FormDefinition {

  constructor (buyBackFormDef: any, pageId: string) {
    super(buyBackFormDef, pageId);
  }
}

'use strict';

export const mapSubscriptionState = state => {
    const subscriptionResults = state.map(item => {
        let subscriptionParameterResults = {};
        item.subscriptionParameters.forEach(params => {
            subscriptionParameterResults[params.datasourceParameterName] = params.subscriptionParameterValue;
        });

        console.log("mapSubscriptionState subscriptionParameters: ", subscriptionParameterResults);

        return {
            id: item.subscriptionId,
            name: item.subscriptionName,
            img: "img/doubleclick.png",
            description: item.subscriptionDescription,
            createdon: item.createdOn,
            filters: "", //"Networks: Amgen (7788), Advertiser: Amgen - BiTE DSE",
            parameters: subscriptionParameterResults,
            storeid: item.storeId
        };
    });

    console.log("mapSubscriptionState subscriptionResults: ", subscriptionResults);
    return subscriptionResults;
}
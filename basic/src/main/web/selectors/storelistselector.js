'use strict';

export const mapStoreListState = state => {
    const storeResults = state.map(item => {
        const destinationParameterResults = 
            item.destinationParameters.map(item => {
                return { 
                    id: item.destinationParameterId, 
                    name: item.destinationTypeParameterName, 
                    value: item.destinationParameterValue
                }
            });

        console.log("mapStoreListState destinationParameters: ", destinationParameterResults);

        return {
            id: item.storeId,
            title: item.storeName,
            img: "img/mstore3.png",
            description: item.storeDescription,
            owner: item.owner,
            destination: {
                type: item.destinationTypeName,
                parameters: destinationParameterResults
            }
        }
    });

    console.log("mapStoreListState storeResults: ", storeResults);
    return storeResults;
}
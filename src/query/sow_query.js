import gql from 'graphql-tag'
import apolloClient from 'client'

export function getSowList(params) {
    return apolloClient.query({
        query: gql`query sow{
                ear_tag_id
                location_id
                currnet_status
            }
        }`,
        variables: params
    })
}

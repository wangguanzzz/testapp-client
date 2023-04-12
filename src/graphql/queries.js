import { START_ACK_TIMEOUT } from '@aws-amplify/pubsub/lib-esm/Providers/constants'
import {gql,GraphQLClient} from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:5000/graphql'

export const getUser= async (headers)=>{ 
    const client = new GraphQLClient(GRAPHQL_URL,headers)
    const query  = gql`
    query Query {
      user {
        balance
        id
        username
        leases {
          endtime
          instance
          password
          publicIP
          starttime
          id
        }
      }
    }
    `
    
    const {user} = await client.request(query)
    return user
}

export const createLease = async(headers)=>{
    const client = new GraphQLClient(GRAPHQL_URL,headers)
    const query = gql`
    mutation CreateLease {
      createLease {
        balance
        id
        leases {
          endtime
          id
          instance
          password
          publicIP
          starttime
        }
        username
      }
    }
    `
    const {createLease} = await client.request(query)
    return createLease
}

export const removeLease = async(headers,lease) =>{
  const client = new GraphQLClient(GRAPHQL_URL,headers)
  const query = gql`
  mutation Mutation($input: RemoveLeaseInput!) {
    removeLease(input: $input) {
      balance
      id
      leases {
        endtime
        id
        instance
        password
        publicIP
        starttime
      }
      username
    }
  }
  
  `
  const input = {
    "input": {
      id: lease.id,
      instance: lease.instance,
      starttime: lease.starttime
    }
  }
  const {removeLease} =  await client.request(query,input)
  return removeLease
}
import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl:"http://127.0.0.1:8000/api/",
})

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery,
    endpoints: (builder)=> ({
        sendLoginRequest: builder.mutation({
            query: (data)=> ({
                url:"token/",
                method:"POST",
                body:data,
            }),

            transformResponse : (response, meta)=>({
                data:response,
                status:meta.response.status
            }),
            transformErrorResponse : (response)=> {
                return response.data
            }
        }),

        sendSignUpRequest: builder.mutation({
            query: (data)=> ({
                url:"signup/",
                method:"POST",
                body:data
            }),

            transformResponse: (response, meta) => ({
                response:response,
                status:meta.response.status
            }),

            transformErrorResponse: (response)=> {
                return response.data
            }
            


        })
    })
})


export const { 
    useSendLoginRequestMutation,
    useSendSignUpRequestMutation,
 } = authApi
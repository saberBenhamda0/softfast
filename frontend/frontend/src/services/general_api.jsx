import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery =  fetchBaseQuery({
    baseUrl:"http://127.0.0.1:8000/api/",
    prepareHeaders: (headers, { getState }) => {
        const state = getState(); // Access the entire state
        const token = state.auth.access; // Access the token from the state

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
})


export const generalApi = createApi({
    reducerPath:"api",
    baseQuery,
    endpoints: (builder) => ({

        sendGetPost: builder.query({
            query: ()=> `posts/`
        }),

        sendGetPostById : builder.query({
            query: (id)=> `post/${id}`
        }),

        sendRefreshToken : builder.mutation({
            query: (refreshToken)=> ({
                url:"token/refresh/",
                method:"POST",
                body:refreshToken
            }),
            transformResponse: (response, meta)=> ({
                data: response,
                status: meta.response.status
            }),
            transformErrorResponse : (response)=>{ 
                return response.data
            }

            
        }),
        sentGetMessages: builder.query({
            query: (id) => `messages/${id}/`
        }),
        sendGetConversationsForUser: builder.query({
            query: ()=> `conversations/`
        }),
        sendCreateConversation : builder.mutation({
            query : (body) => ({
                url:"create_conversation/",
                method:"POST",
                body:body,
            }),
            transformResponse: (response, meta)=> ({
                data: response,
                status: meta.response.status
            }),

        })


    }),



})




export const { 
    useSendGetPostQuery,
    useSendGetPostByIdQuery,
    useSendRefreshTokenMutation,
    useLazySentGetMessagesQuery,
    useSentGetMessagesQuery,
    useSendGetConversationsForUserQuery,
    useSendCreateConversationMutation,


} = generalApi
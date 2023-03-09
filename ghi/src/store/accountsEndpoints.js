export function accountsEndpoints(builder) {
    return {
        userLogin: builder.mutation({
        query: (info) => {
            let formData = null;
            if (info instanceof HTMLElement) {
            formData = new FormData(info);
            } else {
            formData = new FormData();
            formData.append("username", info.email);
            formData.append("password", info.password);
            }
            return {
            url: "/token",
            method: "post",
            body: formData,
            credentials: "include",
            };
        },
        providesTags:['Account'],
        invalidatesTags: (result) => {
            return (result && ["Token"]) || [];
        },
        }),
        getToken: builder.query({
        query: () => ({
            url: "/token",
            credentials: "include",
        }),
        providesTags: ["Token"],
        }),
        userLogout: builder.mutation({
        query: () => ({
            url: '/token',
            method: 'delete',
            credentials: 'include',
        }),
        invalidatesTags: ["Token", "Account", "TripsList"]
        }),
        userSignup: builder.mutation({
        query: (info) => ({
            url: '/api/accounts',
            method: 'post',
            body: info,
            credentials: 'include',
        }),
        provideTags: ["Account"],
        invalidatesTags: (result) => {
            return (result && ["Token"]) || [];
        },
        }),
        userUpdate: builder.mutation({
            query: (info) => ({
                url: `/api/accounts/${info.accountId}`,
                method: 'update',
                body: info.formData,
                credentials: 'include',
            }),
            invalidatesTags: ["Account"],
        }),
        getMyAccount: builder.query({
            query: (info) => ({
                url: '/api/myaccount',
                providesTags: ["Account"],
            })
        }),
    }
}

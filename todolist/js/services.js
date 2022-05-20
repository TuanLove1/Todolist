export default class Services {
    fetchData() {
        return axios({
            url: "https://625bc0d0398f3bc782ae7df1.mockapi.io/api/dsnhiemvu",
            method: "GET",
        })
    }
    
    deleteTasks(id){
        return axios({
            url:`https://625bc0d0398f3bc782ae7df1.mockapi.io/api/dsnhiemvu/${id}`,
            method:"DELETE",
        })
    }

    addTasks(nhiemvu){
        return axios({
            url: "https://625bc0d0398f3bc782ae7df1.mockapi.io/api/dsnhiemvu",
            method:"POST",
            data:nhiemvu,
        })
    }

    updateTasks(nhiemvu){
        return axios({
            url: `https://625bc0d0398f3bc782ae7df1.mockapi.io/api/dsnhiemvu/${nhiemvu.id}`,
            method:"PUT",
            data:nhiemvu,
        })
    }
}
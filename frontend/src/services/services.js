import http from "../utils/developers-api";

class DevelopersService {
    async getAll() {
        return await http.get("/api");
    }

    async getById(id) {
        return await http.get(`/api/${id}`);
    }

    async create(data) {
        return await http.post("/api", data);
    }

    async update(id, data) {
        return await http.put(`/api/${id}`, data);
    }

    async delete(id) {
        return await http.delete(`/api/${id}`);
    }

}

export default new DevelopersService();
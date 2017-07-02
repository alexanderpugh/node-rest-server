class JsonResponse {
	constructor (message = null, success = false, data = {}) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
}

module.exports = JsonResponse;
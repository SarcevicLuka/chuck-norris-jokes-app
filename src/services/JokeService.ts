import axios from "axios";
import { Joke } from "../types";
import { HttpError } from "../errors/HttpError";

/**
 * @class jokeService
 * @description service class for joke fetching with axios
 */
class JokeService {
	/**
	 *
	 * @returns {Promise<Joke>} joke text that has been fetched from the joke api
	 */
	async fetchJoke(): Promise<Joke> {
		const url = process.env.JOKE_API_URL as string;

		const joke = await axios.get(url);

		if (!joke) throw new HttpError(500, "Error fetching joke");

		return {
			jokeText: joke.data.value
		};
	}
}

const jokeService = new JokeService();

export { jokeService };

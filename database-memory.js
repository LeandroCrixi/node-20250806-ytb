import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
            .map((videoArr) => {
                const id = videoArr[0]
                const data = videoArr[1]

                return {
                    id, ...data
                }
            })
            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                }
                return true
            })
    }

    create(video) {
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id, video) {
        this.#videos.delete(id)
    }
}
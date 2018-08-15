# RentVideos
This is a service that allows you to request/rent videos

### Technologies used:
 * MongoDB
 * Node v10.1.0
 * Express

### Getting started
Clone this repository

        git clone https://github.com/Chris-Maina/rentVideos.git

#### Install the dependencies
        npm install

#### Running the application
        npm start

#### Endpoints

| Resource URI                     |   Methods      |  Description                                                         |
|----------------------------------|----------------|----------------------------------------------------------------------|   
|   /user/register                 | POST           | Registers a new user                                                 |
|   /user/login                    |POST           |   Used to login an existing user                                      |
|   /videos                        |GET/POST       |   Lists all videos, creates a video                                   |
|   /videos/:slug                  | GET/PUT/DELETE | Lists, updates or deletes a specific video                           |
|   /videos/:slug/genres           | POST           |  Adds a genre to a specific video                                    |
|   /videos/:slug/directors        | POST           |  Adds a director to a specific video                                 |
|   /genres                        |GET/POST       |   Lists all genres, creates a genre                                   |
|   /genres/:id                    |GET/PUT/DELETE |  Lists, updates or deletes a specific genre                           |
|   /directors                     |GET/POST       |   Lists all directors, creates a director                             |
|   /directors/:id                 | GET/PUT/DELETE |Lists, updates or deletes a specific director                         |


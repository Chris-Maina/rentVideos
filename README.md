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

| Resource URI                     |   Methods     |  Description                                                         |
|----------------------------------|---------------|----------------------------------------------------------------------|
|  /catalog                        |   GET         |  Lists the all the resources                                         |
|  /catalog/<resource>             |   GET         |  Lists all videos, video instances, genres or director               |
|  /catalog/<resource>/<id>        |   GET         |  Details page for a specific video, video instance, genre or director|
|  /catalog/<resource>/create      |   POST        |  Creates a new video, video instance, genre or director              |
|  /catalog/<resource>/<id>/update |   PATCH/PUT   |  Updates a specific video, video instance, genre or director         |
|  /catalog/<resource>/<id>/delete |   DELETE      |  Deletes a specific video, video instance, genre or director         |

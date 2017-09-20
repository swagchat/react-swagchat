[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![npm version](https://badge.fury.io/js/swagchat-sdk.svg)](https://badge.fury.io/js/react-swagchat)

# swagchat UIKit (A set of React components)

swagchat is an open source chat components for your webapps.

This is UIKit for [Chat API](http://github.com/fairway-corp/swagchat-chat-api)

![Architecture](https://client.fairway.ne.jp/swagchat/img/uikit-messenger-20170920.png "Architecture")

## Architecture

![Architecture](https://client.fairway.ne.jp/swagchat/img/swagchat-start-guide-20170920.png "Architecture")

##### Related repositories

* [Chat API](https://github.com/fairway-corp/swagchat-chat-api)
* [RTM API (Real Time Messaging API)](https://github.com/fairway-corp/swagchat-rtm-api)
* [SDK (TypeScript & JavaScript)](https://github.com/swagchat/swagchat-sdk-js)


## Installation

### CDN

```
<script src="https://unpkg.com/react-swagchat/dist/react-swagchat.min.js"></script>
```

### npm

```
npm install --save react-swagchat
```

Please use TypeScript for development.

react-swagchat provides its own type definitions, so you don't need `@types/react-swagchat` installed!


## Usage

### Browser

Using the `renderTemplateMessenger` function you can create the general chat UI (including screen transition).

```
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" type="text/css" media="all">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" type="text/css" media="all">
    <link rel="stylesheet" href="https://unpkg.com/react-swagchat/dist/react-swagchat.min.css">
</head>
<body>
  <div id="swagchat" />
  <script src="https://unpkg.com/react-swagchat/dist/react-swagchat.min.js"></script>
  <script>
      Swag.renderMessenger({
        userId: 'USER_ID',
        apiEndpoint: 'http://localhost:9000/v0',
      });
  </script>
</body>
```

### Node

```
import { Avatar } from 'react-swagchat';

const AvatarExample = () => (
  <Avatar
    src="https://dummyimage.com/300x300/3768c4/fff&text=circle"
    shape="circle"
    onClick={() => alert("Click")}
  />
);

```

## Development

```
npm install

npm run build:css (Create type definitions of css file)
npm run build:lib (for Node)
npm run cpx:css (Copy css and css.d.js file globs)
npm run build:dev (for Browser [development])
npm run build:prod (for Browser [production])
```

### Build flow

![Architecture](https://client.fairway.ne.jp/swagchat/img/uikit-build-20170920.png "Build flow")


## License

MIT License.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![npm version](https://badge.fury.io/js/swagchat-sdk.svg)](https://badge.fury.io/js/react-swagchat)

# SwagChat UIKit for React

SwagChat is an open source chat components for your webapps.

This is UIKit for React.

![Architecture](https://client.fairway.ne.jp/swagchat/img/react-swagchat-sample-ui-20170630.png "Architecture")

## Components

* [RESTful API Server (Go)](http://github.com/fairway-corp/swagchat-api)
* [Realtime Messaging (Go)](http://github.com/fairway-corp/swagchat-realtime)
* [Client SDK (TypeScript & JavaScript)](https://github.com/fairway-corp/swagchat-sdk)
* **UIKit (Typescript - React) ---> This repository**

## Architecture

![Architecture](https://client.fairway.ne.jp/swagchat/img/architecture-201703011307.png "Architecture")

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

Using the `renderTemplateGeneral` function you can create the general chat UI (including screen transition).

```
<head>
    <link rel="stylesheet" href="https://unpkg.com/react-swagchat/dist/react-swagchat.min.css">
</head>
<body>
  <div id="swagchat" />
  <script src="https://unpkg.com/react-swagchat/dist/react-swagchat.min.js"></script>
  <script>
    renderTemplateGeneral({
      renderDomId: 'swagchat',
      roomListTitle: 'Room List',
      noRoomListText: 'No rooms.',
      noRoomListImage: 'https://unpkg.com/react-swagchat/dist/img/no-image.png',
      noMessageText: 'No messages.',
      noMessageImage: 'https://unpkg.com/react-swagchat/dist/img/no-image.png',
      inputMessagePlaceholderText: 'Input text...',
      roomSettingTitle: 'Room Settings',
      roomMembersTitle: 'Members',
      apiEndpoint: 'http://localhost:9000/v0',
      realtimeEndpoint: 'ws://localhost:9100/v0',
      userId: 'USER_ID',
      userAccessToken: 'ACCESS_TOKEN',
    });
  </script>
</body>
```

### Node

```
import { TopBar, RoomList } from 'react-swagchat';

const RoomList = (props) => (
  <TopBar
    title={props.roomListTitle}
  />
  <RoomList
    myUserId={props.userId}
    userRooms={props.userRooms}
    roomListItems={props.roomListItems}
    hasTopBar={props.true}
    noRoomListText={props.noRoomListText}
    noRoomListImage={props.noRoomListImage}
  />
);

```

## Development

```
npm install

npm run build:lib (for Node)
npm run build:dev (for Browser [development])
npm run build:prod (for Browser [production])
```

### environment

* node v6.9.4
* npm v5.0.3

## License

MIT License.

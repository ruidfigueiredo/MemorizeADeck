## Memory Ace

Demo project for ElectronCGI.

This game/application is a port of a Windows Store application named [Memory Ace](https://www.microsoft.com/en-us/p/memory-ace/9wzdncrddbtd?activetab=pivot:overviewtab) that can run in Windows, Linux and Mac.

This animation was captured in Linux:

![Memory Ace running on Linux](memory-ace-ubuntu.gif)

It uses 100% of original non-UI code (ViewModels) and the UI was (re-)created using [React](https://reactjs.org/).

To run it you need the [.NET Core SDK installed](https://dotnet.microsoft.com/) and [Node.js](https://nodejs.org/)

The easiest way to get it to run it is:

    $ cd memorize-a-deck-electron
    $ npm install
    $ npm start

The first time you run it it will take much more time to start because the .NET project will restore its dependencies (this is done automatically after version 3.0 of .NET core, if you have issues go into the .NET project and perform a `dotnet restore` first).

If you want to have a "hot reload" experience and be able to change the React project and see the changes immediately here's what you can do:

    $ cd memorize-a-deck-react-ui
    $ yarn install
    $ yarn start (ignore the errors in the browser window that is opened automatically)

In another terminal:

    $ cd memorize-a-deck-electron
    $ npm install
    $ npm run start-dev


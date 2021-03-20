# dcurl

Distributed cURL command line

Heavily based on the *-fetch code created by [RangerMauve](https://github.com/RangerMauve)
for their outstanding project [Agregore Browser](https://github.com/AgregoreWeb/agregore-browser)
**you should try**

## Install

`npm install -g dcurl`

or

`yarn global add dcurl`


## Use

In this early versions you can only use GET requests and the output is always the terminal.

```
dcurl protocol://server/directory/filename
```
This output will be sent to the screen
If you want to save to a file or want to get a binary file, like an image, you can use:

```
dcurl protocol://server/directory/filename > newfilename
```


### Dat Protocol

Apparently the DAT protocol support doesn't run with old DAT drives.
I have to test this more.

```
dcurl dat://blog.maeve.moe
```


### Gemini Protocol

```
dcurl gemini://gemini.circumlunar.space/
```

```
dcurl gemini://hellomouse.net/mouse.jpg  > mouse.jpg
```


### Hypercore protocol

```
dcurl hyper://blog.maeve.moe/
```


### IPFS protocol

The support for IPNS is still broken. Only IPNS requests can be made.

```
dcurl ipns://ipfs.io/
```


# curld

cURL for Distributed Web command line

Heavily based on the *-fetch code created by [RangerMauve](https://github.com/RangerMauve)
for their outstanding project [Agregore Browser](https://github.com/AgregoreWeb/agregore-browser)
**you should try**

## Install

`npm install -g curld`

or

`yarn global add curld`


## Use

In these early versions, you can only use GET requests, and the output is always in the terminal.

```
curld protocol://server/directory/filename
```
This output will be sent to the screen
If you want to save to a file or want to get a binary file, like an image, you can use:

```
curld protocol://server/directory/filename > newfilename
```


### Dat Protocol

Apparently the DAT protocol support doesn't run with old DAT drives.
I will have to test this more.

```
curld dat://blog.maeve.moe
```


### Gemini Protocol

```
curld gemini://gemini.circumlunar.space/
```

```
curld gemini://hellomouse.net/mouse.jpg  > mouse.jpg
```


### Hypercore protocol

```
curld hyper://blog.maeve.moe/
```


### IPFS protocol

The support for IPFS is still broken. Only IPNS requests can be made.

```
curld ipns://ipfs.io/
```


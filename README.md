# RTDB
Tiny in-memory database cum message broker dirtily coded in less than 100 lines

### How to run:
```
git clone https://github.com/sivaramanr/rtdb.git
cd rtdb
npm install
nodejs index.js
```

### To connect via TCP client (netcat):
```
sudo apt install netcat #if not already installed
netcat 127.0.0.1 1337
```
## Commands
- [SET](#Set)
- [GET](#get)
- [DELETE](#delete)
- [SUBSCRIBE](#subscribe)
- [UNSUBSCRIBE](#unsubscribe)
- [PUBLISH](#publish)
- [QUIT](#quit)

### SET &lt;KEY&gt; &lt;VALUE&gt;

```
netcat 127.0.0.1 1337
SET sessionId 74850590-81ee-11ea-bc55-0242ac130003
> ***OK***
```

### GET &lt;KEY&gt;

```
netcat 127.0.0.1 1337
GET sessionId
74850590-81ee-11ea-bc55-0242ac130003
```
### GET &lt;KEY&gt;

```
netcat 127.0.0.1 1337
GET sessionId
74850590-81ee-11ea-bc55-0242ac130003
```
### DELETE &lt;KEY&gt;

```
netcat 127.0.0.1 1337
DELETE sessionId
OK
```
### SUBSCRIBE &lt;TOPIC&gt;

```
netcat 127.0.0.1 1337
SUBSCRIBE news
OK
```
### UNSUBSCRIBE &lt;TOPIC&gt;

```
netcat 127.0.0.1 1337
UNSUBSCRIBE news
OK
```

### PUBLISH &lt;MESSAGE&gt;

```
netcat 127.0.0.1 1337
PUBLISH news COVID 19 Situation Report
```

### QUIT

```
netcat 127.0.0.1 1337
QUIT
```

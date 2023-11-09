
# Dev Notes

Notes to share among us. To guide us and help us, while developing this project.

## Working with Docker Compose

<table><tr><td>
Written by Robin Johannesson
</td></tr></table>

In order to start docker compose, run this command:

```console
$ docker compose up -d server webbclient
```

And in order to access the client, run this command:

```console
$ docker compose up client
```

And to stop the server and the network, run this command:

```console
$ docker compose down
```


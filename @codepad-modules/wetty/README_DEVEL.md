pty.js is mostly unmaintained. That leads to problems mostly with node-gyp building and the nan package. It has to be updated manually from time to time.

https://github.com/chjj/pty.js/pull/198

For people bumped into related issues and still waiting for this PR, you can use `npm-shrinkwrap` to force the `nan` version.

Example:

```json
{
  "name": "<your package name>",
  "version": "<your package version>",
  "lockfileVersion": 1,
  "dependencies": {
    "pty.js": {
      "version": "0.3.1",
      "from": "pty.js@0.3.1",
      "dependencies": {
        "nan": {
          "version": "2.12.1",
          "from": "nan@2.12.1"
        }
      }
    }
  }
}
```

After updating nan in pty.js use "npm install --unsafe-perm" if building as root. ...

The final fix is to make a pty module, that can use pty.js or node-pty.
The pty module has support for runtime node-gyp built nan, so it works across node updates.
# Checking if lua-applets is installed and running
lua-applets will by default, run on port 9733.
You can check if the userscript is installed by checking for a log in the console. Specifically, "enabled on localhost:9733".
You can also check if the daemon is running by pinging localhost:9733.
# how do I use lua-applets in my application
Just use a GET request to localhost:9733/run-lua?code= and then your code.
The user will get prompted with a safety message. (I plan to allow user to silence this message in the future automatically)
Output will be returned in the request, in JSON format. It will also be in the console for debugging.
Lua must be installed on the user's computer. (This will be done automatically by the installer)

And that's all! It's an incredibly simple program. I plan for some UI to be added in the future, similar to Flash or Java Applets.
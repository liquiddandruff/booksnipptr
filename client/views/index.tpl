<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      body {
        overflow: auto;
      }
      .root {
        width: 100%;
        height: 100%;
      }
    </style>
    <title><%= htmlWebpackPlugin.options.title || 'Flask React Boilerplate' %></title>
  </head>
  <body>
    <div class="root" id="root"></div>
  </body>
</html>

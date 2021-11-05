# rolling_penguins
Git repository for our documentation and code for the Event/Tourism app in the study course "Interaction Programming"


# Deploying on GH-Pages
1. Open angular.json and set "outputPath": to "dist/" ## Only necessary for the first time
2. Run the following command to create a new deployable Angular project: 
ng build --base-href "https://interactionprototyping.github.io/WS2022_RollingPenguins/"
3. Run the following command to publish the current deployed Angular project to the gh-page: 
npx angular-cli-ghpages — dir=dist/web-app
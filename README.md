# SharePoint Form Filler extension
This extension is a great time saver when testing or demonstrating SharePoint solutions. It will fill-up a Edit or New Form in SharePoint.

## Features / Description
- Open SharePoint form and click the extension icon to the right of address bar.
- Fields will be filled with random data. Click again on the icon to re-generate data.
- Supports most field types.

## Installing
Go to [Chrome store](https://chrome.google.com/webstore/detail/sharepoint-form-filler/ilibncgojbaeebmgaiodlhomfeplhmei) to download the release version.

Source Code: [https://github.com/jcerniauskas/spformfiller](https://github.com/jcerniauskas/spformfiller)

## Supported environments
Extension currently works on SharePoint 2013 and SharePoint Online classic client-side rendered forms.

## Limitations
- Will not work on server-rendered forms
- Will not work on new SharePoint Online experience forms

## Contributing
- Fork repository
- Run `npm install`
- Make changes
- Run `gulp build`
- Open (chrome://extensions/) or select the menu `Window > Extensions`
- Enable the developer mode at top right
- Click `Load unpacked extension...` and select the `app` folder
- Test changes
- Create a pull request for `develop` branch to contribute

## Original author
Original idea and implementation by Half Scheidl

## License
This project is licensed under the terms of the [MIT](http://opensource.org/licenses/MIT) license.
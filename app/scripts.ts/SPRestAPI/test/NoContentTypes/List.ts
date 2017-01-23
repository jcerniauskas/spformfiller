export const List = {
  "AllowContentTypes": true,
  "BaseTemplate": 101,
  "BaseType": 1,
  "ContentTypesEnabled": false,
  "CrawlNonDefaultViews": false,
  "Created": "2017-01-23T17:15:12Z",
  "CurrentChangeToken": {
    "StringValue": "1;3;86166636-bf96-4c7b-9f85-2f1d467bfe59;636207948741530000;113833525"
  },
  "CustomActionElements": {
    "Items": [
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": null,
        "Location": "EditControlBlock",
        "RegistrationId": "vdw",
        "RegistrationType": 4,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "View in Web Browser",
        "UrlAction": "~site/_layouts/15/VisioWebAccess/VisioWebAccess.aspx?listguid={ListId}&itemid={ItemId}&DefaultItemOpen=1"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": null,
        "Location": "EditControlBlock",
        "RegistrationId": "vsdx",
        "RegistrationType": 4,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "View in Web Browser",
        "UrlAction": "~site/_layouts/15/VisioWebAccess/VisioWebAccess.aspx?listguid={ListId}&itemid={ItemId}&DefaultItemOpen=1"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": null,
        "Location": "EditControlBlock",
        "RegistrationId": "vsdm",
        "RegistrationType": 4,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "View in Web Browser",
        "UrlAction": "~site/_layouts/15/VisioWebAccess/VisioWebAccess.aspx?listguid={ListId}&itemid={ItemId}&DefaultItemOpen=1"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": null,
        "Location": "EditControlBlock",
        "RegistrationId": "0x01",
        "RegistrationType": 2,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Compliance Details",
        "UrlAction": "javascript:if (typeof CalloutManager !== 'undefined' && Boolean(CalloutManager) && Boolean(CalloutManager.closeAll)) CalloutManager.closeAll(); commonShowModalDialog('{SiteUrl}'+ \r\n            '/_layouts/15/itemexpiration.aspx' \r\n            +'?ID={ItemId}&List={ListId}', 'center:1;dialogHeight:500px;dialogWidth:500px;resizable:yes;status:no;location:no;menubar:no;help:no', function GotoPageAfterClose(pageid){if(pageid == 'hold') {STSNavigate(unescape(decodeURI('{SiteUrl}'))+ \r\n            '/_layouts/15/hold.aspx' \r\n            +'?ID={ItemId}&List={ListId}');  return false;} if(pageid == 'audit') {STSNavigate(unescape(decodeURI('{SiteUrl}'))+\r\n            '/_layouts/15/Reporting.aspx'\r\n            +'?Category=Auditing&backtype=item&ID={ItemId}&List={ListId}'); return false;} if(pageid == 'config') {STSNavigate(unescape(decodeURI('{SiteUrl}'))+\r\n            '/_layouts/15/expirationconfig.aspx'\r\n            +'?ID={ItemId}&List={ListId}'); return false;} if(pageid == 'tag') {STSNavigate(unescape(decodeURI('{SiteUrl}'))+\r\n            '/_layouts/15/Hold.aspx'\r\n            +'?Tag=true&ID={ItemId}&List={ListId}'); return false;}}, null);"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/icxddoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "xsn",
        "RegistrationType": 4,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Edit in Browser",
        "UrlAction": "~site/_layouts/15/formserver.aspx?XsnLocation={ItemUrl}&OpenIn=Browser&Source={Source}"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/icxddoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "InfoPath.Document",
        "RegistrationType": 3,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Edit in Browser",
        "UrlAction": "~site/_layouts/15/formserver.aspx?XmlLocation={ItemUrl}&OpenIn=Browser&Source={Source}"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/icxddoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "InfoPath.Document.2",
        "RegistrationType": 3,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Edit in Browser",
        "UrlAction": "~site/_layouts/15/formserver.aspx?XmlLocation={ItemUrl}&OpenIn=Browser&Source={Source}"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/icxddoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "InfoPath.Document.3",
        "RegistrationType": 3,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Edit in Browser",
        "UrlAction": "~site/_layouts/15/formserver.aspx?XmlLocation={ItemUrl}&OpenIn=Browser&Source={Source}"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/icxddoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "InfoPath.Document.4",
        "RegistrationType": 3,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "1"
        },
        "Title": "Edit in Browser",
        "UrlAction": "~site/_layouts/15/formserver.aspx?XmlLocation={ItemUrl}&OpenIn=Browser&Source={Source}"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/versions.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "0x0120D520",
        "RegistrationType": 2,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "0"
        },
        "Title": "Document Set Version History",
        "UrlAction": "javascript:SP.UI.ModalDialog.ShowPopupDialog('{SiteUrl}'+ \r\n                '/_layouts/15/DocSetVersions.aspx'\r\n                + '?List={ListId}&ID={ItemId}')"
      },
      {
        "CommandUIExtension": null,
        "EnabledScript": null,
        "ImageUrl": "/_layouts/15/images/sendOtherLoc.gif?rev=44",
        "Location": "EditControlBlock",
        "RegistrationId": "0x0120D520",
        "RegistrationType": 2,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "0"
        },
        "Title": "Send To other location",
        "UrlAction": "javascript:GoToPage('{SiteUrl}' +\r\n                '/_layouts/15/docsetsend.aspx' \r\n                + '?List={ListId}&ID={ItemId}')"
      },
      {
        "CommandUIExtension": "<CommandUIExtension xmlns=\"http://schemas.microsoft.com/sharepoint/\"><CommandUIDefinitions><CommandUIDefinition Location=\"Ribbon.Documents.New.Controls._children\"><Button Id=\"Fondia.Smart.O365.AddFromTemplate.Button\" TemplateAlias=\"o1\" Command=\"Fondia.Smart.O365.AddFromTemplate.Command\" CommandType=\"General\" LabelText=\"Add from Model\" Image32by32=\"{SiteUrl}/_layouts/15/1033/Images/formatmap32x32.png?rev=41\" Image32by32Top=\"-35\" Image32by32Left=\"-69\" /></CommandUIDefinition></CommandUIDefinitions><CommandUIHandlers><CommandUIHandler Command=\"Fondia.Smart.O365.AddFromTemplate.Command\" CommandAction=\"javascript: showTemplateSearchDialog();\" /></CommandUIHandlers></CommandUIExtension>",
        "EnabledScript": null,
        "ImageUrl": null,
        "Location": "CommandUI.Ribbon.ListView",
        "RegistrationId": "101",
        "RegistrationType": 1,
        "RequireSiteAdministrator": false,
        "Rights": {
          "High": "0",
          "Low": "2"
        },
        "Title": "Add from template",
        "UrlAction": "javascript: showTemplateSearchDialog();"
      }
    ]
  },
  "DefaultContentApprovalWorkflowId": "00000000-0000-0000-0000-000000000000",
  "Description": "All fields types, no content types enabled",
  "Direction": "none",
  "DocumentTemplateUrl": "/sites/cernijusdev/SPFormFillerTest_NoCT/Forms/template.dotx",
  "DraftVersionVisibility": 0,
  "EnableAttachments": false,
  "EnableFolderCreation": true,
  "EnableMinorVersions": false,
  "EnableModeration": false,
  "EnableVersioning": true,
  "EntityTypeName": "SPFormFillerTest_x005f_NoCT",
  "ExemptFromBlockDownloadOfNonViewableFiles": false,
  "FileSavePostProcessingEnabled": false,
  "ForceCheckout": false,
  "HasExternalDataSource": false,
  "Hidden": false,
  "Id": "86166636-bf96-4c7b-9f85-2f1d467bfe59",
  "ImageUrl": "/_layouts/15/images/itdl.png?rev=44",
  "IrmEnabled": false,
  "IrmExpire": false,
  "IrmReject": false,
  "IsApplicationList": false,
  "IsCatalog": false,
  "IsPrivate": false,
  "ItemCount": 0,
  "LastItemDeletedDate": "2017-01-23T17:15:12Z",
  "LastItemModifiedDate": "2017-01-23T18:48:25Z",
  "LastItemUserModifiedDate": "2017-01-23T17:15:12Z",
  "ListExperienceOptions": 0,
  "ListItemEntityTypeFullName": "SP.Data.SPFormFillerTest_x005f_NoCTItem",
  "MajorVersionLimit": 500,
  "MajorWithMinorVersionsLimit": 0,
  "MultipleDataList": false,
  "NoCrawl": false,
  "ParentWebPath": {
    "DecodedUrl": "/sites/cernijusdev"
  },
  "ParentWebUrl": "/sites/cernijusdev",
  "ParserDisabled": false,
  "ServerTemplateCanCreateFolders": true,
  "TemplateFeatureId": "00bfea71-e717-4e80-aa17-d0c71b360101",
  "Title": "SPFormFillerTest_NoCT"
}
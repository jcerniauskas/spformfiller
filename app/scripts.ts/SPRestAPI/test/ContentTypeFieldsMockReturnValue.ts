export const ContentTypeFieldsMockReturnValue = {
  "value": [
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "ContentType",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "_Hidden",
      "Hidden": false,
      "Id": "c042a256-787d-4a6f-8a8a-cf6ab767f12d",
      "Indexed": false,
      "InternalName": "ContentType",
      "JSLink": null,
      "ReadOnlyField": false,
      "Required": false,
      "SchemaXml": "<Field ID=\"{c042a256-787d-4a6f-8a8a-cf6ab767f12d}\" Type=\"Computed\" DisplayName=\"Content Type\" Name=\"ContentType\" DisplaceOnUpgrade=\"TRUE\" RenderXMLUsingPattern=\"TRUE\" Sortable=\"FALSE\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"ContentType\" Group=\"_Hidden\" PITarget=\"MicrosoftWindowsSharePointServices\" PIAttribute=\"ContentTypeID\" FromBaseType=\"TRUE\"><FieldRefs><FieldRef Name=\"ContentTypeId\" /></FieldRefs><DisplayPattern><MapToContentType><Column Name=\"ContentTypeId\" /></MapToContentType></DisplayPattern></Field>",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": false,
      "StaticName": "ContentType",
      "Title": "Content Type",
      "FieldTypeKind": 12,
      "TypeAsString": "Computed",
      "TypeDisplayName": "Computed",
      "TypeShortDescription": "Computed",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "EnableLookup": false
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "SelectFilename",
      "Filterable": false,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": true,
      "Id": "5f47e085-2150-41dc-b661-442f3027f552",
      "Indexed": false,
      "InternalName": "SelectFilename",
      "JSLink": null,
      "ReadOnlyField": true,
      "Required": false,
      "SchemaXml": "<Field ID=\"{5f47e085-2150-41dc-b661-442f3027f552}\" ReadOnly=\"TRUE\" Type=\"Computed\" Name=\"SelectFilename\" DisplayName=\"Select\" Hidden=\"TRUE\" CanToggleHidden=\"TRUE\" Sortable=\"FALSE\" Filterable=\"FALSE\" AuthoringInfo=\"(web part connection)\" HeaderImage=\"blank.gif\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"SelectFilename\" FromBaseType=\"TRUE\"><FieldRefs><FieldRef Name=\"ID\" /></FieldRefs><DisplayPattern><IfEqual><Expr1><GetVar Name=\"SelectedID\" /></Expr1><Expr2><Column Name=\"ID\" /></Expr2><Then><HTML><![CDATA[<img align=\"absmiddle\" style=\"cursor: pointer\" src=\"/_layouts/15/images/rbsel.gif?rev=44\" alt=\"]]></HTML><HTML>Selected</HTML><HTML><![CDATA[\"/>]]></HTML></Then><Else><HTML><![CDATA[<a href=\"javascript:SelectField(']]></HTML><GetVar Name=\"View\" /><HTML><![CDATA[',']]></HTML><ScriptQuote NotAddingQuote=\"TRUE\"><Column Name=\"ID\" /></ScriptQuote><HTML><![CDATA[');return false;\" onclick=\"javascript:SelectField(']]></HTML><GetVar Name=\"View\" /><HTML><![CDATA[',']]></HTML><ScriptQuote NotAddingQuote=\"TRUE\"><Column Name=\"ID\" /></ScriptQuote><HTML><![CDATA[');return false;\" target=\"_self\">]]></HTML><HTML><![CDATA[<img border=\"0\" align=\"absmiddle\" style=\"cursor: pointer\" src=\"/_layouts/15/images/rbunsel.gif?rev=44\"  alt=\"]]></HTML><HTML>Normal</HTML><HTML><![CDATA[\"/>]]></HTML><HTML><![CDATA[</a>]]></HTML></Else></IfEqual></DisplayPattern></Field>",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": false,
      "StaticName": "SelectFilename",
      "Title": "Select",
      "FieldTypeKind": 12,
      "TypeAsString": "Computed",
      "TypeDisplayName": "Computed",
      "TypeShortDescription": "Computed",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "EnableLookup": false
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "FileLeafRef",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": false,
      "Id": "8553196d-ec8d-4564-9861-3dbe931050c8",
      "Indexed": false,
      "InternalName": "FileLeafRef",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": false,
      "Required": true,
      "SchemaXml": "<Field ID=\"{8553196d-ec8d-4564-9861-3dbe931050c8}\" ShowInFileDlg=\"FALSE\" ShowInVersionHistory=\"FALSE\" Type=\"File\" Name=\"FileLeafRef\" DisplayName=\"Name\" AuthoringInfo=\"(for use in forms)\" List=\"Docs\" FieldRef=\"ID\" ShowField=\"LeafName\" JoinColName=\"DoclibRowId\" JoinRowOrdinal=\"0\" JoinType=\"INNER\" Required=\"TRUE\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"FileLeafRef\" FromBaseType=\"TRUE\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": true,
      "StaticName": "FileLeafRef",
      "Title": "Name",
      "FieldTypeKind": 18,
      "TypeAsString": "File",
      "TypeDisplayName": "File",
      "TypeShortDescription": "File",
      "ValidationFormula": null,
      "ValidationMessage": null
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "Created",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": true,
      "Id": "8c06beca-0777-48f7-91c7-6da68bc07b69",
      "Indexed": false,
      "InternalName": "Created",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": true,
      "Required": false,
      "SchemaXml": "<Field ID=\"{8c06beca-0777-48f7-91c7-6da68bc07b69}\" ColName=\"tp_Created\" RowOrdinal=\"0\" ReadOnly=\"TRUE\" Type=\"DateTime\" Name=\"Created\" DisplayName=\"Created\" StorageTZ=\"TRUE\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"Created\" FromBaseType=\"TRUE\" Hidden=\"TRUE\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": true,
      "StaticName": "Created",
      "Title": "Created",
      "FieldTypeKind": 4,
      "TypeAsString": "DateTime",
      "TypeDisplayName": "Date and Time",
      "TypeShortDescription": "Date and Time",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "DateTimeCalendarType": 0,
      "DisplayFormat": 1,
      "FriendlyDisplayFormat": 0
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "Title",
      "Filterable": true,
      "FromBaseType": false,
      "Group": "Custom Columns",
      "Hidden": false,
      "Id": "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
      "Indexed": false,
      "InternalName": "Title",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": false,
      "Required": false,
      "SchemaXml": "<Field ID=\"{fa564e0f-0c70-4ab9-b863-0177e6ddd247}\" Type=\"Text\" Name=\"Title\" ShowInNewForm=\"FALSE\" ShowInFileDlg=\"FALSE\" DisplayName=\"Title\" Sealed=\"TRUE\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"Title\" ColName=\"nvarchar7\" Required=\"FALSE\" ShowInEditForm=\"TRUE\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": true,
      "Sortable": true,
      "StaticName": "Title",
      "Title": "Title",
      "FieldTypeKind": 2,
      "TypeAsString": "Text",
      "TypeDisplayName": "Single line of text",
      "TypeShortDescription": "Single line of text",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "MaxLength": 255
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "Modified",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": true,
      "Id": "28cf69c5-fa48-462a-b5cd-27b6f9d2bd5f",
      "Indexed": false,
      "InternalName": "Modified",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": true,
      "Required": false,
      "SchemaXml": "<Field ID=\"{28cf69c5-fa48-462a-b5cd-27b6f9d2bd5f}\" ColName=\"tp_Modified\" RowOrdinal=\"0\" ReadOnly=\"TRUE\" Type=\"DateTime\" Name=\"Modified\" DisplayName=\"Modified\" StorageTZ=\"TRUE\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"Modified\" FromBaseType=\"TRUE\" Hidden=\"TRUE\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": true,
      "StaticName": "Modified",
      "Title": "Modified",
      "FieldTypeKind": 4,
      "TypeAsString": "DateTime",
      "TypeDisplayName": "Date and Time",
      "TypeShortDescription": "Date and Time",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "DateTimeCalendarType": 0,
      "DisplayFormat": 1,
      "FriendlyDisplayFormat": 0
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "Modified_x0020_By",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": false,
      "Id": "822c78e3-1ea9-4943-b449-57863ad33ca9",
      "Indexed": false,
      "InternalName": "Modified_x0020_By",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": true,
      "Required": false,
      "SchemaXml": "<Field ID=\"{822c78e3-1ea9-4943-b449-57863ad33ca9}\" ReadOnly=\"TRUE\" Hidden=\"FALSE\" Type=\"Text\" Name=\"Modified_x0020_By\" DisplayName=\"Document Modified By\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"Modified_x0020_By\" FromBaseType=\"TRUE\" ColName=\"nvarchar1\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": true,
      "StaticName": "Modified_x0020_By",
      "Title": "Document Modified By",
      "FieldTypeKind": 2,
      "TypeAsString": "Text",
      "TypeDisplayName": "Single line of text",
      "TypeShortDescription": "Single line of text",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "MaxLength": 255
    },
    {
      "AutoIndexed": false,
      "CanBeDeleted": false,
      "ClientSideComponentId": "00000000-0000-0000-0000-000000000000",
      "DefaultValue": null,
      "Description": "",
      "Direction": "none",
      "EnforceUniqueValues": false,
      "EntityPropertyName": "Created_x0020_By",
      "Filterable": true,
      "FromBaseType": true,
      "Group": "Custom Columns",
      "Hidden": false,
      "Id": "4dd7e525-8d6b-4cb4-9d3e-44ee25f973eb",
      "Indexed": false,
      "InternalName": "Created_x0020_By",
      "JSLink": "clienttemplates.js",
      "ReadOnlyField": true,
      "Required": false,
      "SchemaXml": "<Field ID=\"{4dd7e525-8d6b-4cb4-9d3e-44ee25f973eb}\" ReadOnly=\"TRUE\" Hidden=\"FALSE\" Type=\"Text\" Name=\"Created_x0020_By\" DisplayName=\"Document Created By\" SourceID=\"http://schemas.microsoft.com/sharepoint/v3\" StaticName=\"Created_x0020_By\" FromBaseType=\"TRUE\" ColName=\"nvarchar2\" />",
      "Scope": "/sites/cernijusdev/Shared Documents",
      "Sealed": false,
      "Sortable": true,
      "StaticName": "Created_x0020_By",
      "Title": "Document Created By",
      "FieldTypeKind": 2,
      "TypeAsString": "Text",
      "TypeDisplayName": "Single line of text",
      "TypeShortDescription": "Single line of text",
      "ValidationFormula": null,
      "ValidationMessage": null,
      "MaxLength": 255
    }
  ]
}
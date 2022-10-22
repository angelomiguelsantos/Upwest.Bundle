# Upwest.Bundle Umbraco package
## _By Upwest_

Google traking G-TSM2RWN549

TOPICS
Configure Keys




[![Build Status](https://upwest.pt/media/icon3.png)](https://upwest.pt)



Umbraco 9 and 10  tools that streamline and automate member login processes out of the box, with social login buttons (Twitter,Facebook,Linkedin and Google), automatic translations with Azure and Google Services,automatic multilingual setup, Two factor authenticion with Twilio and AspSms sms services, services for inactive accounts, backup for deleted members, email validation, recover password functionality with email templates between others.
The advanced member form builder contains a bundle of higly configurable plugins that you can use also in your content type documents  either in frontend and backend.
## Plugins
    Advanced member form builder (license required)
    Auto complete (license required)
    Check box (free)
    Check box list by member,user,content,database or data type (license required)
    Crop and upload (license required)
    Date range picker (license required)
    Date time picker (free)
    Decimal (free)
    Dropdown list by member,user,content,database or data type (license required)
    Input mask (free)
    Multi date picker (free)
    Radio button list by member,user,content,database or data type (license required)
    Server side input validation (license required)
    Slider (free)
    Tags (free)
    Text area (free)
    Text box (free)
    Time picker (free)

## Features

*   Automatic translation (https://www.youtube.com/watch?v=O6YjmOjXMA8)
*   Two factor authentication by phone or by email 
*   Email validation    
*   Login providers (Facebook,Google,Twitter,Linkedin)
*   Service for inactive accounts
*   Backup for deleted members
*   Recaptcha security
*   Group or role registration
*   Email Templates
*   17 input plugins (frontend, backend)
*   Number of days until the member as to login again
*   Password recovery with email verification
*   Change password form
*   Multilanguage 
## Tech
Upwest bundle uses a number of open source projects:
- Jquery - Enhanced scripts for web apps!
- Bootstrap v3.4.1 - The most popular CSS Framework for developing responsive and mobile-first websites.
- Asp net core 6.0 - A cross platform, high-performance, open-source framework for building modern, cloud-based, internet-connected applications
- Umbraco 9 (or greater) - Umbraco is the leading open-source ASP.NET Core CMS 
- Open source jquery  plugins (kendocore,icheck,ijaboCropTool,moment,intlTelInput,jquery.inputmask,jquery.maskMoney,jquery.smartTab,jquery.smartWizard,trumbowygbootstrap-datepicker,daterangepicker,ion.rangeSlider,selectize,bootstrap-material-datetimepicker,jquery.passwordRequirementspasstrength)
- ASPSMS - Sending worldwide SMS messages with the ASPSMS.com API to over 800 mobile networks. This .NET assembly contains all you need to process text messages, two-factor token authentication and other SMS. Get a free test account and free test credits for your project.
- Twilio - provides a simple HTTP-based API for sending and receiving phone calls and text messages. Learn more on twilio.com.
- Google cloud translation - Recommended Google client library to access the Translate v2 API. It wraps the Google.Apis.Translate.v2 client library, making common operations simpler in client code. The Translate API translates text from one language to another.
- Tweetenvi - Is an intuitive .NET C# library to access the Twitter REST API. It is a .NET Core library that can be used for development in ASP.NET, Xamarin Android, Xamarin iOS and Windows 10 Universal Apps.
- Azure Translation services - A cloud-based machine translation service supporting multiple languages. Translator is used to build applications, websites, tools, or any solution requiring multilanguage support. Azure Translator Text API is a cloud-based machine translation service supporting multiple languages

## Installation
	dotnet add package Upwest.Bundle 1.0.0



*    Ask for your licence.lic file that contains your licence key to angelo.santos@upwest.pt and put it in your 'App_Plugins/upwest.bundle/_upwest.base' directory `
*    You can test Upwest.Bundle on your localhost environment without any restrictions


Check more on https://www.youtube.com/watch?v=fF5elq3Ed4g

    

## Configuration
There is a set of keys in your a appsettings.json to add your provider Keys

```html
"Upwest": {
    "AzureTranslator": {
      "Translate": false,
      "Key": "Your Key",
      "Location": "westeurope",
      "Endpoint": "https://api.cognitive.microsofttranslator.com/",
      "TranslateFrom": "en"
    },
    "GoogleTranslator": {
      "Translate": false,
      "FileName": "Your file name"
    },
    "Upwest": {
      "Key": "Please request your key to angelo.santos@upwest.pt",
      "TranslateFrom": "en"
    },
    "Recaptcha": {
      "Key": "Your Key",
      "Url": "https://www.google.com/recaptcha/api.js",
      "Secret": "Your Secret Key",
      "SiteVerifyUrl": "https://www.google.com/recaptcha/api/siteverify"
    },
    "Facebook": {
      "Key": "Your Key",
      "SecretKey": "Your Secret Key",
      "Version": "14.0"
    },
    "Twitter": {
      "Key": "Your Key",
      "Secret": "Your Secret Key",
      "AccessToken": "You Acess token",
      "AccessTokenSecret": "You Acess token secret"
    },
    "Google": {
      "ClientId": "Your Key",
      "Secret": "Your Secret Key"
    },
    "Linkedin": {
      "ClientId": "Your client Id",
      "ClientSecret": "Your client Secret"
    },
    "Twilio": {
      "AccountSid": "Your Account sid",
      "AuthToken": "Your Auth token",
      "PhoneNumber": "Your Phone number",
      "Activate": false
    },
    "AspSms": {
      "UserKey": "Your User Key",
      "Password": "Your Password",
      "PhoneNumber": "Your Phone number",
      "Activate": false
    }
  }
```

Dont´t forget to add your email settings as well.

* Please consult https://www.youtube.com/watch?v=fF5elq3Ed4g for instalation instructions
* Please consult  https://www.youtube.com/watch?v=O6YjmOjXMA8 for translation instructions

the package will automatically add this snippet to your default template 
```html
@*Your upwest.Member*@
@(await Component.InvokeAsync("upwest.member", new { alias = "youralias", model = Model }))
@*Your upwest.Member*@
```

For changing the css please add it before the snippet like this
```html
<link rel="stylesheet" href="path/to/your/styles.css">**

@*Your upwest.Member*@
@(await Component.InvokeAsync("upwest.member", new { alias = "youralias", model = Model }))
@*Your upwest.Member*@

```
**NOTE : ALL THE PACKAGES INCLUDED IN UPWEST.BUNDLE WERE BUILT WITH MAXIMUM CSS ISOLATION BUT CAN COLIDE WITH YOUR OWN CSS´S

IT IS NOT UPWEST RESPONSABLILTY TO ADJUST ANY KIND OF DESIGN OR CSS APART FORM THE ONES PROVIDED  

All the views of Upwest.Bundle are compiled but you can override them by placing in the path /Views/Shared/Components/**
If you have a license file please request the views 

This package was tested in Umbraco 9.x.x and 10.x.x so it will work on these Umbraco versions.
If you have any kind of problems in any of this versions please open an issue on https://github.com/angelomiguelsantos/Upwest.Bundle/issues.

If you have a licence key please send an email directly to angelo.santos@upwest.pt and we contact you directly as soon as possible

## For production environments
    Upwest keys (not reqired for localhost environment)
    Azure keys for bing translation services (if applicable)
    Google json file for translation services keys (if applicable) 
    Facebook Sign in keys (if applicable) 
    Twitter Sign in keys (if applicable) 
    Linkedin Sign in keys (if applicable) 
    Google Sign in keys (if applicable) 
    Twilio Sms service keys (if applicable) 
    AspSms Sms service keys (if applicable) 
    Smtp email server account (if applicable) 


## Price 
Purchase package for 120€ / one license per umbraco domain, contempling assistence and updates during a period of a year

## Subscription Renewals
When your subscription expires, you can renew to receive another year of updates and support. If you choose not to renew, you can continue using the last product version released before your subscription expired.


## License
Put your license.lic file in /App_Plugins/upwest.bundle/_upwest.base/[your license.lic file goes here]

Read license file - https://www.upwest.pt/#mu-license
 

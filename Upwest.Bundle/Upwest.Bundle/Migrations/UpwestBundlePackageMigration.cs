using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Dynamic;
using System.IO;
using System.Linq;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Packaging;

namespace upwest.bundle.Migrations
{

    #region AppSettings
    public class AppSettings
    {
        public AppSettings()
        {

        }

        public AppSettings Read(IWebHostEnvironment webHostEnvironment)
        {
            var appSettingsPath = Path.Combine(webHostEnvironment.ContentRootPath, "appsettings.json");
            var json = System.IO.File.ReadAllText(appSettingsPath);
            return JsonConvert.DeserializeObject<AppSettings>(json);
        }


        public Azuretranslator AzureTranslator { get; set; } = new Azuretranslator();
        public Googletranslator GoogleTranslator { get; set; } = new Googletranslator();
        public Upwest Upwest { get; set; } = new Upwest();
        public Recaptcha Recaptcha { get; set; } = new Recaptcha();
        public Facebook Facebook { get; set; } = new Facebook();
        public Twitter Twitter { get; set; } = new Twitter();
        public GoogleOAuth Google { get; set; } = new GoogleOAuth();
        public Linkedin Linkedin { get; set; } = new Linkedin();
        public Twilio Twilio { get; set; } = new Twilio();
        public AspSms AspSms { get; set; } = new AspSms();
    }

    public class Azuretranslator
    {
        public bool Translate { get; set; } = false;
        public string Key { get; set; } = "Your Key";
        public string Location { get; set; } = "westeurope";
        public string Endpoint { get; set; } = "https://api.cognitive.microsofttranslator.com/";
        public string TranslateFrom { get; set; } = "en";
    }

    public class Googletranslator
    {
        public bool Translate { get; set; } = false;
        public string FileName { get; set; } = "Your google translator file name";
    }

    public class Upwest
    {
        public string Key { get; set; } = "PLEASE REQUEST YOUR KEY TO 'ANGELO.SANTOS@UPWEST.PT'";
        public string TranslateFrom { get; set; } = "en";
    }

    public class Recaptcha
    {
        public string Key { get; set; } = "Your Key";
        public string Url { get; set; } = "https://www.google.com/recaptcha/api.js";
        public string Secret { get; set; } = "Your Secret Key";
        public string SiteVerifyUrl { get; set; } = "https://www.google.com/recaptcha/api/siteverify";
    }
    

    public class Linkedin
    {
        public string ClientId { get; set; } = "Your client Id";
        public string ClientSecret { get; set; } = "Your client Secret";

    }

    public class Facebook
    {
        public string Key { get; set; } = "Your Key";
        public string SecretKey { get; set; } = "Your Secret Key";
        public string Version { get; set; } = "14.0";
    }

    public class Twitter
    {
        public string Key { get; set; } = "Your Key";
        public string Secret { get; set; } = "Your Secret Key";
        public string AccessToken { get; set; } = "You Acess token";        
        public string AccessTokenSecret { get; set; } = "You Acess token secret";
    }

    public class GoogleOAuth
    {
        public string ClientId { get; set; } = "Your Key";
        public string Secret { get; set; } = "Your Secret Key";
    }   

    public class Twilio
    {
        public string AccountSid { get; set; } = "Your Account sid";
        public string AuthToken { get; set; } = "Your Auth token";        
        public string PhoneNumber { get; set; } = "Your Phone number";
        public bool Activate { get; set; } = false;

    }
    
    public class AspSms
    {
        public string UserKey { get; set; } = "Your User Key";
        public string Password { get; set; } = "Your Password";        
        public string PhoneNumber { get; set; } = "Your Phone number";
        public bool Activate { get; set; } = false;
    }



    #endregion

    public class UpwestBundlePackageMigration : PackageMigrationBase
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IPackagingService packagingService;
        private readonly IMemberTypeService memberTypeService;
        private readonly IDataTypeService dataTypeService;
        private readonly IShortStringHelper shortStringHelper;

        [System.Obsolete]
        public UpwestBundlePackageMigration(IMemberTypeService memberTypeService, IPackagingService packagingService,IMediaService mediaService,MediaFileManager mediaFileManager,MediaUrlGeneratorCollection mediaUrlGenerators,IShortStringHelper shortStringHelper,IContentTypeBaseServiceProvider contentTypeBaseServiceProvider, IMigrationContext context, IWebHostEnvironment webHostEnvironment,IDataTypeService dataTypeService) : base(packagingService,                                              mediaService,mediaFileManager,mediaUrlGenerators,shortStringHelper,contentTypeBaseServiceProvider,context)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.packagingService = packagingService;
            this.memberTypeService = memberTypeService;
            this.dataTypeService = dataTypeService;
            this.shortStringHelper = shortStringHelper;
        }
        protected override void Migrate()
        {
            //ImportPackage.FromEmbeddedResource(GetType()).Do();
            AddAppSettings();
            AddPropertiesToMemberTypes();

        }

        private void AddAppSettings()
        {
            var appSettingsPath = Path.Combine(webHostEnvironment.ContentRootPath, "appsettings.json");
            var json = System.IO.File.ReadAllText(appSettingsPath);
            var jsonSettings = new JsonSerializerSettings();
            jsonSettings.Converters.Add(new ExpandoObjectConverter());
            jsonSettings.Converters.Add(new StringEnumConverter());
            dynamic config = JsonConvert.DeserializeObject<ExpandoObject>(json, jsonSettings);
            config.Upwest = new AppSettings();
            var newJson = JsonConvert.SerializeObject(config, Formatting.Indented, jsonSettings);
            System.IO.File.WriteAllText(appSettingsPath, newJson);
        }

        private void AddPropertiesToMemberTypes()
        {
            IDataType labelType = dataTypeService.GetAll().FirstOrDefault(x => x.Name == "Label (string)");
            foreach (IMemberType memberType in memberTypeService.GetAll())
            {
                if (!memberType.PropertyTypeExists("upwest_loginType"))
                {
                    PropertyType propType = new(shortStringHelper, labelType)
                    {
                        Name = "Login Type",
                        Alias = "upwest_loginType",
                        Description = "Shows the login provider (if normal login saves as 'Website')"
                    };

                    _ = memberType.AddPropertyType(propType);
                    memberTypeService.Save(memberType);
                }

                if (!memberType.PropertyTypeExists("upwest_language"))
                {
                    PropertyType lblType = new(shortStringHelper, labelType)
                    {
                        Name = "Language",
                        Alias = "upwest_language",
                        Description = "Member registration language"
                    };

                    _ = memberType.AddPropertyType(lblType);
                    memberTypeService.Save(memberType);
                }

                if (!memberType.PropertyTypeExists("upwest_phoneNumber"))
                {
                    PropertyType maskType = new(shortStringHelper, labelType)
                    {
                        Name = "Phone number",
                        Alias = "upwest_phoneNumber",
                        Description = "Phone number for two factory authentication (Only updates if two factor authentication is enabled on the advanced member plugin)"
                    };

                    _ = memberType.AddPropertyType(maskType);
                    memberTypeService.Save(memberType);
                }

                if (!memberType.PropertyTypeExists("upwest_phonenumberconfirmed"))
                {
                    PropertyType trueFalseType = new(shortStringHelper,"Umbraco.TrueFalse", ValueStorageType.Integer)
                    {
                        Name = "Phone number confirmed",
                        Alias = "upwest_phonenumberconfirmed",
                        Description = "Sets the confirmation of the member phone number (Only changes if two factor authentication is enabled on the advanced member plugin)",
                    };

                    _ = memberType.AddPropertyType(trueFalseType);
                    memberTypeService.Save(memberType);
                }
            }
        }
    }
}


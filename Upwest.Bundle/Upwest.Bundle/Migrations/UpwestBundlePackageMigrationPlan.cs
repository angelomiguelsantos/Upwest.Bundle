using Umbraco.Cms.Core.Packaging;

namespace upwest.bundle.Migrations
{


    //TODO meter o appsettigns config se o parametro não existir
    public class CustomPackageMigrationPlan : PackageMigrationPlan
    {
        public CustomPackageMigrationPlan() : base("Upwest.Bundle Version 1.0.0")
        {

        }

        protected override void DefinePlan()
        {   
            _ = To<UpwestBundlePackageMigration>("Upwest.Bundle Version 1.0.0");
        }
    }
}








    
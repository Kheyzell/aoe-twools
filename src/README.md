## Terminology
- **Tech** => this is the abstraction of a aoe **Unit** or **Technology**
- **Unit** => represents a aoe **Unit** and inherit from **Tech**
- **Upgrade** => represents a aoe **Technology** and inherit from **Tech**

## Directory Structure
<big><pre style="font-size: 14px;">
    root // Root directory. Contains many configuration files and all other folders
    ├── [docs](../docs) // Documentation files
    ├── [public](../public) // Contains public files, all **Units** and **Upgrades** icons and documentation images
    └── [src](../src) // Most of the app's code is here
&emsp;&emsp;&emsp;&emsp;└── [app](app) // Contains the configuration file of the **Redux** store
&emsp;&emsp;&emsp;&emsp;└── [components](components) // Shared and reusable components
&emsp;&emsp;&emsp;&emsp;└── [constants](constants) // Files containing constants used at different parts of the app, particularly the définition of **Units** and **Upgrades**
&emsp;&emsp;&emsp;&emsp;└── [core](core) // Contains essential shared logic, in practice global services
&emsp;&emsp;&emsp;&emsp;└── [features](features) // Contains the features organized in similar fashion to the routing structure
&emsp;&emsp;&emsp;&emsp;|   ├── [civ-filter](feature/civ-filter) // The main feature of filtering civilisations
&emsp;&emsp;&emsp;&emsp;|   ├── [unit-calculator](feature/unit-calculator) // [**In progress**] second feature aiming at showing all statistical details when 2 **Units** fight
&emsp;&emsp;&emsp;&emsp;|         (is at an experimental stage, not really functionnal, is only accessible at https://aoetwools.firebaseapp.com/calculator)
&emsp;&emsp;&emsp;&emsp;└── [i18n](i18n) // Contains internationalization configuration and definition files
&emsp;&emsp;&emsp;&emsp;└── [models](models) // Contains type, interface and class definitions
&emsp;&emsp;&emsp;&emsp;└── [resources](resources) // Contains various static resources, in practice contains icons, background and crest images
&emsp;&emsp;&emsp;&emsp;└── [utils](utils) // Contains utility functions
</pre></big>

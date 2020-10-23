module.exports = {
    extends: ["airbnb"], // Do not change or follow other rule-sets
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6
    },
    plugins: [
        "babel",
        "react",
        "react-hooks",
    ],
    rules: {
        "react/jsx-props-no-spreading": "off",
        // This rule helps me to organise code based on functionality instead of ABC...
        "react/sort-comp": 0,

        // This rule helps ref binding for animation purposes.
        "no-return-assign": 0,

        // This rule helps to write more generic components which can display any kind of item using factory callbacks
        "react/forbid-prop-types": 0,

        // js files can contain jsx code
        "react/jsx-filename-extension": 0,

        // not deceided yet
        "react/prop-types": 0,

        // Used to support development on windows machines
        "linebreak-style": 0,

        // This rule helps the early phases of development.
        "no-console": 0,

        // Fuck this rule
        "jsx-a11y/control-has-associated-label": 0,

        // No reason to not allow this
        "one-var-declaration-per-line": 0,

        // Webstorm contains a bug that "Ensure line feed at file end" editor settings cannot be turned off.
        // Anyway not allowing line padding at the beginning of a block sound unreasonable because code not readable.
        "padded-blocks": 0,

        // We decided to use underscore for private tags to separate public interface of an es6 class for unit testing
        // purposes to see what to test or not.
        "no-underscore-dangle": 0,

        // Code is more readable with 4 char indent.
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],

        // Not clear the reason behind not allow multiple statements in one declaration.
        "one-var": [0, "never"],

        // Input (where this app uses autofocus) is always visible.
        "jsx-a11y/no-autofocus": 0,

        // Looks missing or not customized to our high dpi monitors.
        "max-len": [2, 600],

        // New line at the end of file is not mandatory
        "eol-last": 0,

        // Since ES5, 0 prefix is no longer auto-detected as octal literal and instead treated as decimal literal
        "radix": 0,

        // Typically this is not a runtime error even if defined before used but not in runtime
        "no-use-before-define": 0,

        // Yes we are the best to understand complex code as well even if airbnb not recommends
        "no-nested-ternary": 0,

        // When passing a reference this looks intentional so do not warn
        "no-param-reassign": 0,

        // No sense to not allow this
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true } ],

        // We are leaving developer alone to know whats doing well or not
        "no-mixed-operators": 0,

        // Needed to support pure programming model
        "import/prefer-default-export": 0,

        // Closing my eyes
        "no-restricted-globals": 0,

        // Later turn it off to see if there are no vulnerabilities
        "react/no-danger": 0,

        // Low prio re-rendering issues are fine now
        "react/no-array-index-key": 0,

        // Allow dynamic htmlFor attributes for labels
        "jsx-a11y/label-has-for": [ 2, {
            "components": [ "Label" ],
            "required": {
                "every": [ "id" ]
            },
        }],

        // Aria is disabled for now
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,

        // Currently it's only frustrating and not able to warn for a = b.c; Also ignoreClassFields is not working for me
        "react/destructuring-assignment": 0,

        // Annoying
        "react/jsx-one-expression-per-line": 0,

        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

        // Dependency handling
        "import/no-extraneous-dependencies": ["error", {

            // Do not allow to use peerDeps because with node 8 it's totally unsupported.
            peerDependencies: false,
            // Tell eslint which files can use devDependencies. By default not allowed to use which is ridiculous.
            devDependencies: [
                "build/*",
            ],
        }],
    },
    globals: {
        // As we want to build up a big integration test codebase we prefer to lint test code also
        it: true,
        xit: true,
        describe: true,
    }
};

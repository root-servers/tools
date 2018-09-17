import { DocsInfo, DocsInfoConfig, SupportedDocJson } from '@0xproject/react-docs';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DocPage as DocPageComponent, DocPageProps } from 'ts/pages/documentation/doc_page';
import { Dispatcher } from 'ts/redux/dispatcher';
import { State } from 'ts/redux/reducer';
import { DocPackages } from 'ts/types';
import { Translate } from 'ts/utils/translate';

/* tslint:disable:no-var-requires */
const IntroMarkdownV0 = require('md/docs/0xjs/0.0.1/introduction');
const InstallationMarkdownV0 = require('md/docs/0xjs/0.0.1/installation');
const AsyncMarkdownV0 = require('md/docs/0xjs/0.0.1/async');
const ErrorsMarkdownV0 = require('md/docs/0xjs/0.0.1/errors');
const versioningMarkdownV0 = require('md/docs/0xjs/0.0.1/versioning');

const IntroMarkdownV1 = require('md/docs/0xjs/1.0.0/introduction');
const InstallationMarkdownV1 = require('md/docs/0xjs/1.0.0/installation');
const AsyncMarkdownV1 = require('md/docs/0xjs/1.0.0/async');
const ErrorsMarkdownV1 = ErrorsMarkdownV0;
const versioningMarkdownV1 = require('md/docs/0xjs/1.0.0/versioning');

/* tslint:enable:no-var-requires */

const markdownSections = {
    introduction: 'introduction',
    installation: 'installation',
    testrpc: 'testrpc',
    async: 'async',
    errors: 'errors',
    versioning: 'versioning',
};

const docsInfoConfig: DocsInfoConfig = {
    id: DocPackages.ZeroExJs,
    packageName: '0x.js',
    type: SupportedDocJson.TypeDoc,
    displayName: '0x.js',
    packageUrl: 'https://github.com/0xProject/0x-monorepo',
    markdownMenu: {
        introduction: [markdownSections.introduction],
        install: [markdownSections.installation],
        topics: [markdownSections.async, markdownSections.errors, markdownSections.versioning],
    },
    sectionNameToMarkdownByVersion: {
        '0.0.1': {
            [markdownSections.introduction]: IntroMarkdownV0,
            [markdownSections.installation]: InstallationMarkdownV0,
            [markdownSections.versioning]: versioningMarkdownV0,
            [markdownSections.async]: AsyncMarkdownV0,
            [markdownSections.errors]: ErrorsMarkdownV0,
        },
        '1.0.0': {
            [markdownSections.introduction]: IntroMarkdownV1,
            [markdownSections.installation]: InstallationMarkdownV1,
            [markdownSections.versioning]: versioningMarkdownV1,
            [markdownSections.async]: AsyncMarkdownV1,
            [markdownSections.errors]: ErrorsMarkdownV1,
        },
    },
    markdownSections,
};
const docsInfo = new DocsInfo(docsInfoConfig);

interface ConnectedState {
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
}

interface ConnectedDispatch {
    dispatcher: Dispatcher;
}

const mapStateToProps = (state: State, _ownProps: DocPageProps): ConnectedState => ({
    docsVersion: state.docsVersion,
    availableDocVersions: state.availableDocVersions,
    docsInfo,
    translate: state.translate,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): ConnectedDispatch => ({
    dispatcher: new Dispatcher(dispatch),
});

export const Documentation: React.ComponentClass<DocPageProps> = connect(mapStateToProps, mapDispatchToProps)(
    DocPageComponent,
);

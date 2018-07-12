import { MeshNode } from '../../../common/models/node.model';

export interface NodeBrowserOptions {
    submitLabelKey?: string;
    titleKey?: string;
    titleParams?: { [key: string]: string | number };
    nodeFilter?: any;
    selectablePredicate?: (node: MeshNode) => any;
    projectName: string;
    startNodeUuid: string;
    multiple?: boolean;
}

export interface QueryResult {
    node: {
        uuid: string;
        displayName: string;
        children: {
            totalCount: number;
            pageCount: number;
            elements: PageResult[];
        };
        breadcrumb: Breadcrumb[];
    };
}

export interface Breadcrumb {
    uuid: string;
    text: string;
}

export interface PageResult {
    uuid: string;
    displayName: string;
    isContainer: boolean;
}
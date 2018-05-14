import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/providers/api/api.service';
import { I18nNotification } from '../../../core/providers/i18n-notification/i18n-notification.service';
import { ApplicationStateService } from '../../../state/providers/application-state.service';
import { TagFamilyResponse, TagResponse } from '../../../common/models/server-models';
import { TagFamily } from '../../../common/models/tag-family.model';
import { Tag } from '../../../common/models/tag.model';


@Injectable()
export class TagsEffectsService {

    constructor(private api: ApiService,
                private notification: I18nNotification,
                private state: ApplicationStateService) {
    }

    createTagFamily(project: string, name: string): Promise<TagFamilyResponse > {
        this.state.actions.tag.actionStart();
        return this.api.project.createTagFamily({ project }, { name }).toPromise()
        .then(response => {
            this.state.actions.tag.createTagFamilySuccess(response);
            return response;
        }, error => {
            this.state.actions.tag.actionError();
            this.notification.show({
                type: 'error',
                message: 'project.create_tag_family_error'
            });
            throw error;
        });
    }

    createTag(project: string, tagFamilyUuid: string, name: string): Promise<TagResponse> {
        this.state.actions.tag.actionStart();
        return this.api.project.createTag({project, tagFamilyUuid}, { name }).toPromise()
        .then(response => {
            this.state.actions.tag.createTagSuccess(response);
            return response;
        }, error => {
            this.state.actions.tag.actionError();
            this.notification.show({
                type: 'error',
                message: 'project.create_tag_error'
            });
            throw error;
        });
    }

    // Load tag families and their sibling tags for a project
    loadTagFamiliesAndTheirTags(project: string): void {
        this.state.actions.tag.actionStart();
        this.api.project.getTagFamilies({ project })
        .subscribe(tagFamiesResponse => {
            this.state.actions.tag.fetchTagFamiliesSuccess(tagFamiesResponse.data);
            tagFamiesResponse.data.forEach((tagFamily: TagFamily) => this.loadTagsOfTagFamily(project, tagFamily.uuid));
        }, error => {
            this.state.actions.tag.actionError();
            this.notification.show({
                type: 'error',
                message: 'editor.load_tag_families_error'
            });
        });
    }


    loadTagsOfTagFamily(project: string, tagFamilyUuid: string): void {
        this.state.actions.tag.actionStart();
        this.api.project.getTagsOfTagFamily({project, tagFamilyUuid})
        .subscribe(response => {
            this.state.actions.tag.fetchTagsOfTagFamilySuccess(response.data);
        }, error => {
            this.state.actions.tag.actionError();
            this.notification.show({
                type: 'error',
                message: 'editor.load_tags_error'
            });
        });
    }


    deleteTag(project: string, tag: Tag): void {
        this.state.actions.tag.deleteTagStart();
        this.api.project.removeTagFromTagFamily({ project, tagFamilyUuid: tag.tagFamily.uuid, tagUuid: tag.uuid})
        .subscribe(() => {
            this.state.actions.tag.deleteTagSuccess(tag.uuid);
            this.notification.show({
                type: 'success',
                message: 'admin.tag_deleted',
                translationParams: { tagName: tag.name }
            });
        }, error => {
            this.state.actions.tag.deleteTagError();
            this.notification.show({
                type: 'error',
                message: 'admin.tag_deleted_error',
                translationParams: { tagName: tag.name }
            });
        });
    }


    deleteTagFamily(project: string, tagFamily: TagFamily): void {
        this.state.actions.tag.deleteTagFamilyStart();
        this.api.project.deleteTagFamily({ project, tagFamilyUuid: tagFamily.uuid})
        .subscribe(() => {
            this.state.actions.tag.deleteTagFamilySuccess(tagFamily.uuid);
            this.notification.show({
                type: 'success',
                message: 'admin.tag_deleted',
                translationParams: { tagFamilyName: tagFamily.name }
            });
        }, error => {
            this.state.actions.tag.deleteTagFamilyError();
            this.notification.show({
                type: 'error',
                message: 'admin.tag_family_deleted_error',
                translationParams: { tagFamilyName: tagFamily.name }
            });
        });
    }
}

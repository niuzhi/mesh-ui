import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GenticsUICoreModule } from 'gentics-ui-core';

import { AudioPlayButtonComponent } from '../audio-play-button/audio-play-button.component';

import { FilePreviewComponent } from './file-preview.component';

xdescribe('FilePreviewComponent', () => {
    let component: FilePreviewComponent;
    let fixture: ComponentFixture<FilePreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilePreviewComponent, AudioPlayButtonComponent],
            imports: [GenticsUICoreModule]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(FilePreviewComponent);
        component = fixture.componentInstance;
    }));

    it('should render an audio component', () => {
        component.mimeType = 'audio/mp3';
        component.fileName = 'audio.mp3';
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('mesh-audio-play-button'));
        expect(element).toBeTruthy();
    });

    it('should render an image component', () => {
        component.mimeType = 'image/jpeg';
        component.fileName = 'image.jpg';
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('img.preview'));
        expect(element).toBeTruthy();
    });

    it('should render a default placeholder', () => {
        component.mimeType = 'whatever';
        component.fileName = 'whatever.file';
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('.default-preview'));
        expect(element).toBeTruthy();
    });

    it('should render a video component', () => {
        component.mimeType = 'video/ogg';
        component.fileName = 'video.ogg';
        fixture.detectChanges();
        const elem = fixture.debugElement.query(By.css('video'));
        expect(elem).toBeTruthy();
    });
});

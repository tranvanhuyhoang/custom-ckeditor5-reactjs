/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

//add plugin
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';	//IMPORT NEW PLUGIN
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';	//IMPORT NEW PLUGIN
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';	//IMPORT NEW PLUGIN
import Font from '@ckeditor/ckeditor5-font/src/font';		//IMPORT NEW PLUGIN

class InsertImage extends Plugin {
	init() {
			const editor = this.editor;

			editor.ui.componentFactory.add( 'insertImage', locale => {
					const view = new ButtonView( locale );

					view.set( {
							label: 'Insert image',
							icon: imageIcon,
							tooltip: true
					} );

					// Callback executed once the image is clicked.
					view.on( 'execute', () => {
							const imageUrl = prompt( 'Nhập vào URL ảnh' );

							editor.model.change( writer => {
									const imageElement = writer.createElement( 'image', {
											src: imageUrl
									} );

									// Insert the image in the current selection location.
									editor.model.insertContent( imageElement, editor.model.document.selection );
							} );
					} );

					return view;
			} );
	}
}

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	Underline,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	Indent,
	Link,
	List,
	// MediaEmbed,
	Paragraph,
	PasteFromOffice,
	// Table,
	// TableToolbar,
	TextTransformation,
	Alignment,	//ADD PLUGIN
  ImageInsert,	//ADD PLUGIN
	InsertImage,	//ADD PLUGIN
	ImageResize, //ADD PLUGIN
	Font, //ADD PLUGIN
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'alignment',	//DISPLAY HERE
			'bold',
			'italic',
			'underline',
			'fontSize', //DISPLAY HERE
			'fontColor', //DISPLAY HERE
			'fontBackgroundColor', //DISPLAY HERE
			'|',
			'insertImage',	//DISPLAY HERE
			'bulletedList',
			'numberedList',
			// '|',
			// 'outdent', //not use
			// 'indent', //not use
			'|',
			'link',
			'blockQuote',
			// 'insertTable', //not use
			// 'mediaEmbed', //not use
			'undo',
			'redo'
		]
	},
	image: {
		styles: [
			'alignLeft', 'alignCenter', 'alignRight'
		],
		resizeOptions: [
			{
					name: 'resizeImage:original',
					label: 'Original',
					value: null
			},
			{
					name: 'resizeImage:50',
					label: '50%',
					value: '50'
			},
			{
					name: 'resizeImage:75',
					label: '75%',
					value: '75'
			}
		],
		toolbar: [
			'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
			'|',
			'resizeImage',
			'|',
			'imageTextAlternative',
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	fontSize: {
		options: [
			9,
			11,
			13,
			'default',
			17,
			19,
			21,
			25,
			27,
			30
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

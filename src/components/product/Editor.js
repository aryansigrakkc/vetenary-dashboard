import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ handleEditorChange,data,disabled=false }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
            }}

            onChange={handleEditorChange}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
            disabled={disabled}
            height={300}
        />
    )
}

export default Editor
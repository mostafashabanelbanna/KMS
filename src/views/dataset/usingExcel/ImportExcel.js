import { useState } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

const ImportExcel = () => {
    const [img, setImg] = useState(null)

    const uppy = new Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1,  allowedFileTypes: ['application/excel'] },
      autoProceed: true,
      allowMultipleUploads: false
    })
  
    uppy.use(thumbnailGenerator)
  
    uppy.on('thumbnail:generated', (file, preview) => {
      setImg(preview)
    })


    return (
        <Card>
            <CardHeader>
            <CardTitle tag='h4'> Basic </CardTitle>
            </CardHeader>
            <CardBody>
            <DragDrop uppy={uppy} />
            {
    console.log(img)

            }
                 {img !== null ? <img className='rounded mt-2' src={img} alt='avatar' /> : null}
            </CardBody>
        </Card>
    )
}

export default ImportExcel
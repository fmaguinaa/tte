import React, {Component} from 'react';
import axios from 'axios';
import {message, Upload} from 'antd';

const urlEndPoint = `https://zg80igcjwc.execute-api.us-east-1.amazonaws.com/dev/upload`;

const uploadFile = function(data, route, onSuccess, onError) {
  const getDate = new Date();
  getDate.setHours(getDate.getHours() - 5);
  let timestamp = getDate.toISOString();
  timestamp = timestamp.replace(/:/g, '-');
  timestamp = timestamp.replace(/\./g, '-');
  const fileNameStamped = timestamp + data.file.name.replace(/ /g, '_');

  axios.post(
    data.action,
    {
      data: {
        route: route,
        type: data.file.type,
        fileName: fileNameStamped,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(response => {
    const preSignedURL = response.data.url[0];
    const options = {
      headers: {
        'Content-Type': data.file.type,
        'x-amz-acl': 'public-read',
      },
    };

    const downloadedImage = preSignedURL.substr(0, preSignedURL.indexOf('?'));

    axios.put(response.data.url[0], data.file, options).then(result => {
      const reader = new FileReader();
      reader.onloadend = function() {
        onSuccess({success: true, url: downloadedImage}, reader.result);
      };
      reader.readAsDataURL(data.file);
    }).catch(err => {
      onError(err);
    });
  }).catch(err => {
    onError(err);
  });
};

export default class Uploader extends Component {
  post = req => {
    const {
      folderName,
      target,
      onCompleted = null,
      onLoading = null,
      onError = null,
    } = this.props;
    onLoading && onLoading(true);
    uploadFile(
      req,
      `${folderName}/${target ? target._id : 'new-candidate'}`,
      data => {
        if (data.success) {
          const {name, uid, url = data.url, status = 'done'} = req.file;
          console.log("URL", url)
          onCompleted && onCompleted({name, uid, url, status});
          req.onSuccess({name, uid, url, status, file: url});
          message.success(`Archivo subido correctamente`);
        } else {
          onLoading && onLoading(false);
          message.error('Error al subir imagen');
          onError && onError(data, req.file.uid);
        }
      },
      error => {
        message.error('Error al subir imagen');
        onError && onError(error, req.file.uid);
        req.onError(error);
      },
    );
  };

  beforeUpload = file => {
    if (this.props.validFormats) {
      console.log(
        this.props.validFormats,
        file.type,
        this.props.validFormats.indexOf(file.type),
      );
      if (this.props.validFormats.indexOf(file.type) >= 0) {
        return true;
      } else {
        message.error('Suba archivos válidos (.pdf, .docx)');
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    const {
      action,
      headers = {
        'X-Requested-With': null,
      },
      beforeUpload = null,
      customPost = this.post,
      uploadList = true,
      listType = null,
      fileList,
      onChange = null,
      onPreview = null,
      disabled = false,
      accept = null,
    } = this.props;

    return (
      <Upload
        action={action || `${urlEndPoint}`}
        beforeUpload={beforeUpload || this.beforeUpload}
        headers={headers}
        customRequest={customPost}
        showUploadList={uploadList}
        fileList={fileList}
        accept={accept}
        listType={listType}
        onChange={onChange}
        onPreview={onPreview}
        disabled={disabled}
        multiple
      >
        {this.props.children || 'Adjuntar'}
      </Upload>
    );
  }
}

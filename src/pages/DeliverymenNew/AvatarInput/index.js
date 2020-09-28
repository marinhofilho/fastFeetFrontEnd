// study the elements and content of this input

import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdImage } from 'react-icons/md';
import api from '~/services/api';
import { Container } from './styles';
// import { createLetterAvatar } from '~/util/letterAvatar';

export default function AvatarInput({ id }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();
    
  async function getFile(id){
    if (id) {
      const { data } = await api.get(`deliverymen/${id}`);
      if(data.avatar?.url) { 
        setPreview(data.avatar.url)
      }
      else {
        const name = await (await api.get(`deliverymen/${id}`)).data.name;
        /* const initials = 
          name.length > 1 
          ? name[0].charAt(0) + name[1].charAt(0)
          : name[0].charAt(0) + name[0].charAt(1);
        console.log(initials) */
        // unecessary due to ui-avatar
        const avatar = await fetch(`https://ui-avatars.com/api/?rounded=true&name=${name}&background=7c44e4&color=fff`);
        setPreview(avatar.url);
      }
    } 

  }
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    getFile(id);
  }, [id]);

  async function handleChanged(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    console.tron.log(data);

    const response = await api.post('files', data);
    console.tron.log(response);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="avatar" />
        ) : (
          <>
            <div>
              <MdImage size={44} color="#ddd" />
              <strong>Adicionar Foto</strong>
            </div>
          </>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChanged}
          ref={ref}
        />
      </label>
    </Container>
  );
}

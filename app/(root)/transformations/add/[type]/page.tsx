'use client'
import React from 'react';
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import Transformation from '@/components/shared/Transformation';

const TransformationsPage = ({params: {type}} : SearchParamProps) => {
  const transformation = transformationTypes[type]
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle}/>
      <Transformation />
    </>
  )
}

export default TransformationsPage

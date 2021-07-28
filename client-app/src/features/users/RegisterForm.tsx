import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";
import { useTranslation } from "react-i18next";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    const { t } = useTranslation();


    return (
        <Formik
            initialValues={{displayName: '', userName: '', country:'', city:'', email: '', password:'', error:null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error=>
                setErrors({error:error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            }
                
            )}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content={t('bRegister')} color='teal' textAlign='center'/>
                    <MyTextInput name='displayName' placeholder={t('lName')}/>
                    <MyTextInput name='username' placeholder={t('lUsername')}/>
                    <MyTextInput name='email' placeholder={t('lEmail')}/> 
                    <MyTextInput name='password' placeholder={t('lPassword')} type='password'/>
                    
                    <ErrorMessage
                        name='error' render={()=> 
                        <ValidationErrors errors={errors.error} /> }
                    />
                    <Button disabled={!isValid || !dirty} loading={isSubmitting} positive content={t('bRegister')} type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})
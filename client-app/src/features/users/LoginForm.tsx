import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    const { t } = useTranslation();

    
    // eInvalidEmailPassword = Invalid email or password
    return (
        <Formik
            initialValues={{email: '', password:'', error:null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error=>setErrors({error:t('eInvalidEmailPassword')}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content={t('bLogin')} color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder={t('lEmail')}/>
                    <MyTextInput name='password' placeholder={t('lPassword')} type='password'/>
                    <ErrorMessage
                        name='error' render={()=> 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/> }
                    />
                    <Button loading={isSubmitting} positive content={t('bLogin')} type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})
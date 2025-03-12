<template>
  <div>
    <div
      class="py-3 mx-auto w-full"
      :class="step === 1 ? '2xl:w-4/12' : '2xl:w-8/12'"
    >
      <VCard class="py-5 mx-3 rounded-2xl card-wrapper" elevation="0">
        <div class="mr-5 mb-5 flex">
          <h3 v-if="userId" class="font-extrabold text-gray-600">
            {{ $t('editingServiceRecipient') }}
          </h3>
          <h3 v-else class="font-extrabold text-gray-600">
            {{ $t('registrationServiceRecipient') }}
          </h3>
        </div>
        <VDivider />
        <!-- STEP_1 -->
        <UserRecipientFirstStep
          v-if="step === 1"
          :nationality-list="labList"
          :loading="loading.stepOne"
          @update="nextStep"
        />
        <!-- STEP_2 -->
        <VForm
          v-if="step === 2 && prmsList[0] && !loading.stepTwo"
          ref="formTwo"
          class="p-5"
        >
          <!-- SECTION-ONE -->
          <VRow class="my-2" dense>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.name"
                :disabled="model.nationality == 1 && !!initModel.name"
                dense
                outlined
                hide-details
                :rules="stepTwoRules.required"
                class="rounded-lg"
                :label="$t('name')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.family"
                :disabled="model.nationality == 1 && !!initModel.family"
                dense
                outlined
                hide-details
                :rules="stepTwoRules.required"
                class="rounded-lg"
                :label="$t('family')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.nationalId"
                dense
                outlined
                hide-details
                disabled
                class="rounded-lg"
                :label="$t('nationalId')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.cardNO"
                dense
                outlined
                hide-details
                disabled
                class="rounded-lg"
                :label="$t('id')"
              />
            </VCol>
          </VRow>
          <VRow class="my-2" dense>
            <VCol cols="12" md="3">
              <VTextField
                id="datepickerBirthDay"
                :value="
                  model.birthDate &&
                  new Date(model.birthDate).toLocaleString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: 'numeric',
                  })
                "
                outlined
                hide-details
                dense
                :label="$t('dateBirth')"
                readonly
                :disabled="model.nationality == 1"
                clear-icon="mdi-close"
                append-icon="mdi-calendar-outline"
                class="rounded-lg"
                @click:clear="model.birthDate = null"
              />
              <DatePicker
                v-model="model.birthDate"
                :disabled="model.nationality == 1"
                format="YYYY-MM-DD"
                display-format="dddd jDD jMMMM jYYYY"
                custom-input="#datepickerBirthDay"
                @change="$emit('input', model)"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.nationality"
                :items="labList"
                item-text="Title"
                :label="$t('nationality')"
                item-value="Id"
                hide-details
                disabled
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Network"
                :label="$t('coveredCenter')"
                :items="prmsList[0].get('NetworksForRegister')"
                :rules="stepTwoRules.required"
                hide-details
                item-text="Title"
                item-value="Id"
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>

            <VCol md="3">
              <div class="flex items-center mt-2">
                <span>{{ $t('gender') }} :</span>
                <VRadioGroup
                  v-model="model.gender"
                  hide-details
                  :disabled="model.nationality == 1 && !!initModel.gender"
                  mandatory
                  class="mt-0"
                >
                  <div class="flex justify-center items-center -mt-3">
                    <VRadio :value="1" :label="$t('men')" class="mx-2 my-0" />
                    <VRadio :value="2" :label="$t('women')" class="mx-2 my-0" />
                  </div>
                </VRadioGroup>
              </div>
            </VCol>
          </VRow>
          <VDivider />
          <!-- SECTION-TWO -->
          <h4 class="bg-gray-50 p-2 rounded-lg mt-3">
            {{ $t('furtherInformation') }}
          </h4>
          <VRow class="my-3">
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.bloodType"
                :items="prmsList[0].get('BloodType')"
                item-text="Title"
                :label="$t('bloodType')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Residence"
                :items="prmsList[0].get('Residence')"
                item-text="Title"
                :label="$t('typeOfAccommodation')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_School"
                :label="$t('kindergartenCourseUniversity')"
                hide-details
                :items="prmsList[0].get('School')"
                searchable
                item-text="Title"
                item-value="Id"
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Population"
                :items="prmsList[0].get('Population')"
                item-text="Title"
                :label="$t('typeResidence')"
                item-value="Id"
                hide-details
                :rules="stepTwoRules.required"
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
          </VRow>

          <VRow class="my-3">
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.phoneH"
                dense
                outlined
                maxlength="15"
                hide-details
                class="rounded-lg"
                :label="$t('phoneLandline')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.phoneM"
                dense
                outlined
                hide-details
                type="tel"
                maxlength="11"
                :rules="stepTwoRules.phoneM"
                class="rounded-lg"
                :label="$t('phoneNumber')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_PhoneOwner"
                :items="prmsList[0].get('PhoneOwner')"
                item-text="Title"
                :label="$t('phoneOwner')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                :rules="stepTwoRules.required"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.email"
                dense
                outlined
                hide-details
                class="rounded-lg"
                :label="$t('email')"
              />
            </VCol>
          </VRow>
          <VRow v-if="model.id_Population == 3" class="my-3">
            <VCol cols="6">
              <VAutocomplete
                v-model="model.id_PrmTribeClan"
                :items="prmsList[0].get('TribeClan')"
                item-text="Title"
                item-value="Id"
                :label="$t('clan')"
                hide-details
                :rules="[(v) => !!v || '']"
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
          </VRow>
          <VDivider />
          <!-- SECTION-THREE -->
          <h4 class="bg-gray-50 p-2 rounded-lg mt-3">
            {{ $t('residenceAddress') }}
          </h4>
          <VRow class="my-3">
            <VCol cols="12">
              <VTextField
                v-if="areaTitles"
                v-model="areaTitles"
                dense
                outlined
                hide-details
                class="rounded-lg"
                :label="$t('selectNetwork')"
                readonly
                append-icon="mdi-pencil"
                @click:append="areaTitles = null"
              />
            </VCol>
          </VRow>
          <VRow class="my-3">
            <VCol cols="12">
              <VTextField
                v-model="model.address"
                dense
                outlined
                hide-details
                :rules="stepTwoRules.required"
                class="rounded-lg"
                :label="$t('address')"
              />
            </VCol>
          </VRow>
          <VRow class="my-3">
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.zipCode"
                dense
                maxlength="10"
                type="tel"
                outlined
                hide-details
                class="rounded-lg"
                :label="$t('postalCode')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_BlockNumber"
                :label="$t('serviceGroup')"
                item-text="Title"
                item-value="Id"
                :items="blockNumberList"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Insurance"
                :items="prmsList[0].get('InsuranceType')"
                item-text="Title"
                :label="$t('basicInsurance')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
                :disabled="!!userId"
              />
            </VCol>
            <VCol v-if="!userId && model.id_Insurance" cols="12" md="3">
              <VTextField
                id="insuranceValidityDate"
                :value="
                  model.insuranceDateEnd &&
                  new Date(model.insuranceDateEnd).toLocaleString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: 'numeric',
                  })
                "
                outlined
                hide-details
                dense
                :label="$t('insuranceValidityDate')"
                clearable
                :disabled="model.id_Insurance === 83 ? true : false"
                clear-icon="mdi-close"
                readonly
                append-icon="mdi-calendar-outline"
                class="rounded-lg"
                :rules="stepTwoRules.required"
                @click:clear="model.insuranceDateEnd = null"
              />
              <DatePicker
                v-model="model.insuranceDateEnd"
                :disabled="model.id_Insurance === 83 ? true : false"
                format="YYYY-MM-DD"
                display-format="dddd jDD jMMMM jYYYY"
                custom-input="#insuranceValidityDate"
                @change="$emit('input', model)"
              />
            </VCol>
          </VRow>
          <VDivider />
          <!-- SECTION-FOUR -->
          <div
            class="bg-gray-50 p-2 rounded-lg mt-3 flex justify-start items-center"
          >
            <h4>{{ $t('furtherInformation') }}</h4>
            <VBtn
              v-if="userId && !showFamilyRelation"
              color="info"
              text
              class="mr-2"
              @click="
                $router.push({
                  name: 'family-members',
                  query: { nationalId: model.nationalId },
                })
              "
            >
              <small>{{ $t('showFamily') }}</small>
            </VBtn>
          </div>
          <VRow class="my-3">
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.Id_Father"
                dense
                maxlength="10"
                hide-details
                outlined
                type="tel"
                class="rounded-lg"
                :label="$t('fatherNationalId')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.Id_Mother"
                dense
                outlined
                maxlength="10"
                type="tel"
                hide-details
                class="rounded-lg"
                :label="$t('motherNationalId')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.Id_Family"
                dense
                outlined
                hide-details
                disabled
                class="rounded-lg"
                :label="
                  model.Id_Family
                    ? $t('codeHouseholds')
                    : $t('noCodeIsRequiredForFirstTime')
                "
              />
            </VCol>
            <VCol v-if="showFamilyRelation" cols="12" md="3">
              <VAutocomplete
                v-model="model.Id_FamilyRelation"
                :items="prmsList[0].get('FamilyRelation')"
                item-text="Title"
                :label="$t('relationInFamily')"
                item-value="Id"
                hide-details
                searchable
                outlined
                :rules="stepTwoRules.required"
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol v-if="getAge(model.birthDate) > 10" cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Married"
                :items="prmsList[0].get('MarriageType')"
                item-text="Title"
                :label="$t('maritalStatus')"
                item-value="Id"
                hide-details
                :rules="stepTwoRules.required"
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol v-if="getAge(model.birthDate) > 5" cols="12" md="3">
              <VAutocomplete
                v-model="model.id_Stage"
                :items="prmsList[0].get('Stage')"
                item-text="Title"
                :label="$t('educationLevel')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol v-if="getAge(model.birthDate) > 10" cols="12" md="3">
              <VAutocomplete
                v-model="model.id_JobType"
                :items="prmsList[0].get('JobType')"
                item-text="Title"
                :label="$t('jobType')"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol v-if="getAge(model.birthDate) > 6" cols="12" md="3">
              <VAutocomplete
                v-model="model.id_SchoolGrade"
                :label="$t('grade')"
                :items="prmsList[0].get('SchoolGrade')"
                item-text="Title"
                item-value="Id"
                hide-details
                searchable
                outlined
                class="rounded-lg"
                dir="rtl"
                dense
              />
            </VCol>
            <VCol v-if="getAge(model.birthDate) > 10" cols="12" md="3">
              <VTextField
                v-model="model.ChildCnt"
                dense
                outlined
                hide-details
                class="rounded-lg"
                :label="$t('numberChildren')"
              />
            </VCol>
          </VRow>
          <VDivider />
          <!-- SECTION-FIVE -->
          <VRow class="mt-3">
            <VCol cols="12">
              <div class="flex justify-between items-center">
                <VBtn
                  class="py-5"
                  rounded
                  elevation="0"
                  @click="userId ? $router.go(-1) : (step = 1)"
                >
                  <VIcon class="ml-2" size="20">mdi-chevron-right</VIcon>
                  <span v-if="userId" class="mr-3 font-extrabold">{{
                    $t('cancel')
                  }}</span>
                  <span v-else class="mr-3 font-extrabold">{{
                    $t('previousStage')
                  }}</span>
                </VBtn>
                <VBtn
                  v-if="userId"
                  class="sm:mt-1 sm:mx-4 text-light-50 py-5"
                  color="primary"
                  rounded
                  elevation="0"
                  :loading="loading.submit"
                  @click="sumbitEditStepTwo"
                >
                  <VIcon class="ml-2 text-light-50" size="20">mdi-check</VIcon>
                  <span class="mr-3 font-extrabold">{{
                    $t('saveChanges')
                  }}</span>
                </VBtn>

                <VBtn
                  v-else
                  class="sm:mt-1 sm:mx-4 text-light-50 py-5"
                  color="primary"
                  rounded
                  elevation="0"
                  :loading="loading.submit"
                  @click="submitStepTwo"
                >
                  <VIcon class="ml-2 text-light-50" size="20">mdi-check</VIcon>
                  <span class="mr-3 font-extrabold">{{ $t('save') }}</span>
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCard>
    </div>
  </div>
</template>

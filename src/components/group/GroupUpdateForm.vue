<template>
  <default-form>
    <div class="form-outline mb-2">
      <default-label>Название</default-label>
      <default-input type="text" v-model:value="group.name" required />
    </div>

    <div class="form-outline mb-2">
      <default-label>Учитель</default-label>
      <div class="input-group">
        <default-input
          @click="showModal(teachersModal)"
          type="text"
          v-model:value="currentTeacher"
          required
          readonly
        />
        <div class="input-group-text">
          <img src="../../assets/table.png" alt="table" />
        </div>
      </div>
    </div>

    <default-modal
      class="teacher__modal"
      title="Список учителей"
      ref="teachersModal"
    >
      <template #body>
        <default-label>Поиск</default-label>
        <default-input
          type="text"
          v-model:value="teachers.table.search.value"
          style="margin-bottom: 10px"
        />
        <easy-data-table
          table-class-name="customize-table"
          :headers="teachers.table.headers"
          :items="teachers.table.content"
          :rows-per-page="10"
          :search-field="teachers.table.search.field"
          :search-value="teachers.table.search.value"
          @click-row="selectTeacher"
          show-index
        />
      </template>
    </default-modal>

    <div class="form-outline mb-2">
      <default-label>Описание</default-label>
      <default-text-area type="text" v-model:value="group.description" />
    </div>

    <div class="form-outline mb-2">
      <default-label>Состав</default-label>
      <div class="input-group mb-2">
        <default-input
          @click="showModal(studentsModal)"
          type="text"
          required
          readonly
        />
        <div class="input-group-text">
          <img src="../../assets/table.png" alt="table" />
        </div>
      </div>

      <default-modal
        class="students__modal"
        title="Список учеников"
        ref="studentsModal"
      >
        <template #body>
          <default-label>Поиск</default-label>
          <default-input
            type="text"
            v-model:value="students.table.search.value"
            style="margin-bottom: 10px"
          />
          <easy-data-table
            table-class-name="customize-table"
            :headers="students.table.headers"
            :items="students.table.content"
            :rows-per-page="10"
            :search-field="students.table.search.field"
            :search-value="students.table.search.value"
            @click-row="selectStudent"
            show-index
            buttons-pagination
          />
        </template>
      </default-modal>

      <easy-data-table
        table-class-name="customize-table"
        :headers="group.students.table.headers"
        :items="group.students.table.content"
        :rows-per-page="10"
        :search-field="students.table.search.field"
        :search-value="students.table.search.value"
        show-index
        hide-footer
      >
        <template #item-operation="item">
          <div class="operation-wrapper">
            <img
              src="../../assets/delete.png"
              class="operation-icon"
              @click="deleteStudent(item)"
            />
          </div>
        </template>
      </easy-data-table>
    </div>
  </default-form>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import DefaultForm from "@/components/ui/DefaultForm";
import DefaultLabel from "@/components/ui/DefaultLabel";
import DefaultInput from "@/components/ui/DefaultInput";
import DefaultTextArea from "@/components/ui/DefaultTextArea";
import DefaultModal from "@/components/ui/DefaultModal";
import { sendGetRequest } from "@/services/api/getRequest";
import { sendUpdateRequest } from "@/services/api/updateRequest";
import { useHttp } from "@/plugins/axiosPlugin";
import { initWebApp } from "@/services/telegram/initWebApp";

const teachersModal = ref(null);
const studentsModal = ref(null);

const teachers = reactive({
  table: {
    headers: [{ text: "Учитель", value: "teacher" }],
    content: [],
    search: {
      field: "teacher",
      value: "",
    },
  },
});

const students = reactive({
  table: {
    headers: [{ text: "Ученик", value: "student" }],
    content: [],
    search: {
      field: "student",
      value: "",
    },
  },
});

const group = reactive({
  name: null,
  description: null,
  teacher: {
    id: null,
    name: "",
    surname: "",
    patronymic: "",
  },
  students: {
    table: {
      headers: [
        { text: "Ученик", value: "student" },
        { text: "", value: "operation", width: 30 },
      ],
      content: [],
    },
  },
});

const currentTeacher = computed(() => getTeacher(group.teacher));

function showModal(modal) {
  modal.show();
}
function closeModal(modal) {
  modal.value.close();
}

function setGroup(getGroup) {
  group.name = getGroup.name;
  group.description = getGroup.description;

  if (getGroup.teacher) {
    setTeacher(getGroup.teacher);
  }
  console.log(getGroup.students);
  group.students.table.content = getGroup.students.map((student) => {
    return { student: getStudent(student), ...student };
  });
}

function setTableData(getTeachers, getStudents) {
  teachers.table.content = getTeachers.teachers.map((teacher) => {
    return { teacher: getTeacher(teacher), ...teacher };
  });

  getStudents.students.forEach((student) => {
    if (!group.students.table.content.find((s) => s.id === student.id)) {
      students.table.content.push({
        student: getStudent(student),
        ...student,
      });
    }
  });
}

function getTeacher(teacher) {
  return `${teacher.surname} ${teacher.name} ${teacher.patronymic}`;
}

function getStudent(student) {
  return `${student.surname} ${student.name} ${student.patronymic}`;
}

function setTeacher(teacher) {
  group.teacher.id = teacher.id;
  group.teacher.name = teacher.name;
  group.teacher.surname = teacher.surname;
  group.teacher.patronymic = teacher.patronymic ? teacher.patronymic : "";
}

function selectTeacher(teacher) {
  setTeacher(teacher);
  closeModal(teachersModal);
}

function selectStudent(student) {
  students.table.content = students.table.content.filter(
    (s) => s.id !== student.id
  );
  group.students.table.content.push(getStudentTableObject(student));
}

function deleteStudent(student) {
  group.students.table.content = group.students.table.content.filter(
    (s) => s.id !== student.id
  );
  students.table.content.push(getStudentTableObject(student));
}

function getStudentTableObject(student) {
  return {
    student: getStudent(student),
    id: student.id,
    name: student.name,
    surname: student.surname,
    patronymic: student.patronymic,
  }
}

onMounted(async () => {
  const http = useHttp();
  const route = useRoute();

  const groupId = route.params.id;
  const groupResponse = await sendGetRequest(http, `/root/group/${groupId}`);
  const teachersResponse = await sendGetRequest(http, "/root/teachers");
  const studentsResponse = await sendGetRequest(http, "/root/students");

  setGroup(groupResponse.data);
  setTableData(teachersResponse.data, studentsResponse.data);

  initWebApp("Изменить запись", () =>
    sendUpdateRequest(http, `/root/group/${groupId}`, {
      name: group.name,
      description: group.description,
      teacher: {
        id: group.teacher.id,
        name: group.teacher.name,
        surname: group.teacher.surname,
        patronymic: group.teacher.patronymic,
      },
      students: group.students.table.content,
    })
  );
});
</script>

<style scoped>
.customize-table {
  border-radius: 0.375rem;
  --easy-table-header-font-size: 14px;
  --easy-table-body-row-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-body-item-padding: 10px 15px;
}
</style>

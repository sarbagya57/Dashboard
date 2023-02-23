const table = document.getElementById("employeeList");
let employeeList;

function openForm() {
  document.getElementById("popupForm").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.querySelector("body").style.overflow = "auto";
  clearField();
}

// function to vaidate form

function validateForm() {
  const employeeName = document.getElementById("employeeName").value;
  const country = document.getElementById("country").value;
  const type = document.getElementById("type").value;
  const paidDays = document.getElementById("paidDays").value;
  const timeOff = document.getElementById("timeOff").value;
  const netPay = document.getElementById("netPay").value;

  if (employeeName == "") {
    document.getElementById("validEmployeeName").innerHTML =
      "Please enter Employee Name";
    return false;
  }
  if (country == "") {
    document.getElementById("validCountry").innerHTML =
      "Please enter Country Name";
    return false;
  }
  if (type == "") {
    document.getElementById("validType").innerHTML =
      "Please enter Employee Type";
    return false;
  }
  if (paidDays == "") {
    document.getElementById("validPaidDays").innerHTML =
      "Please enter Paid Days";
    return false;
  }
  if (timeOff == "") {
    document.getElementById("validTimeOff").innerHTML = "Please enter Time Off";
    return false;
  }
  if (netPay == "") {
    document.getElementById("validNetPay").innerHTML = "Please enter Net Pay";
    return false;
  }
  return true;
}

// Function to show data in the table

function showData() {
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  let html = "";

  employeeList.forEach(function (element, index) {
    html +=
      `<tr class="table__row">
      <td class=table__data> 
        <div class="table__column">
          <h4 class="table__name"> ${element.employeeName} </h4>
          <div class="table__details">
            <img src= />
            <span> ${element.country} </span>
        </div>
      </td>
      <td class="table__data"> ${element.type} </td>
      <td class="table__data"> ${element.paidDays} Days </td>
      <td class="table__data"> ${element.timeOff} Days </td>
      <td class="table__data">  ${element.netPay} </td>
      <td class="table__data"> 
        <div class="button-group table-btn">
          <button onclick="updateData(` +
      index +
      `)" class= "btn-form btn-form__success">
            Update
          </button>
          <button onclick="deleteData(` +
      index +
      `)" class= "btn-form btn-form__danger">
                  Delete
          </button> 
        </div>
      </td> 
    </tr>`;
  });

  document.querySelector("tbody").innerHTML = html;
}

// Load all data when page loaded

document.onload = showData();

// Function to add data in the table

function addData() {
  if (validateForm() == true) {
    const employeeName = document.getElementById("employeeName").value;
    const country = document.getElementById("country").value;
    const type = document.getElementById("type").value;
    const paidDays = document.getElementById("paidDays").value;
    const timeOff = document.getElementById("timeOff").value;
    const netPay = document.getElementById("netPay").value;

    let employeeList;
    if (localStorage.getItem("employeeList") == null) {
      employeeList = [];
    } else {
      employeeList = JSON.parse(localStorage.getItem("employeeList"));
    }

    employeeList.push({
      employeeName: employeeName,
      country: country,
      type: type,
      paidDays: paidDays,
      timeOff: timeOff,
      netPay: netPay,
    });

    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    showData();
    document.getElementById("employeeName").value = " ";
    document.getElementById("country").value = " ";
    document.getElementById("type").value = " ";
    document.getElementById("paidDays").value = " ";
    document.getElementById("timeOff").value = " ";
    document.getElementById("netPay").value = " ";

    closeForm();
    location.reload();
  } else {
    return false;
  }
}

// Function to delete data from table

function deleteData(index) {
  let confirm = window.confirm("Are you sure you want to delete this item");

  if (confirm === true) {
    if (localStorage.getItem("employeeList") == null) {
      employeeList = [];
    } else {
      employeeList = JSON.parse(localStorage.getItem("employeeList"));
      showData();
    }
    employeeList.splice(index, 1);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    showData();
    closeForm();
    location.reload();
  } else {
    return false;
  }
}

// Function for total paid days

function totalPaidDays() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  let paid = employees.map((employe) => employe.paidDays);
  paid = paid.map(Number);
  const totalPaid = paid.reduce(function (days, index) {
    return days + index;
  });
  document.getElementById("footer-paid").innerHTML = totalPaid + " Days";
  console.log(totalPaid);
}

totalPaidDays();

// Function for total paid days

function totalTimeOff() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  let time = employees.map((employe) => employe.timeOff);
  time = time.map(Number);
  const totalTime = time.reduce(function (days, index) {
    return days + index;
  });
  document.getElementById("footer-timeOff").innerHTML = totalTime + " Days";
  console.log(totalTime);
}

totalTimeOff();

// Function for calculating total net pay

function totalNetPay() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  let net = employees.map((employe) => employe.netPay);
  net = net.map(Number);
  const totalNet = net.reduce(function (n, index) {
    return n + index;
  });
  document.getElementById("total").innerHTML = "$ " + totalNet;
  document.getElementById("footer-total").innerHTML = "$ " + totalNet;
  console.log(totalNet);
}

totalNetPay();

function clearField() {
  document.getElementById("employeeName").value = " ";
  document.getElementById("country").value = " ";
  document.getElementById("type").value = " ";
  document.getElementById("paidDays").value = " ";
  document.getElementById("timeOff").value = " ";
  document.getElementById("netPay").value = " ";
}

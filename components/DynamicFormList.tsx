// src/components/DynamicFormList.tsx
import React from 'react';
import { Form, Input, Select, Radio, Switch, Button, Space } from 'antd';

const { Option } = Select;

// 定义 Item 接口
interface Item {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'switch' | string | 'formList'; // 扩展支持的类型
  options?: string[]; // 仅用于 select 和 radio
  mlutiple?: boolean;
  items?: Item[];
}

// 更新 Field 接口
interface Field {
  layout: 'inline' | 'vertical' | 'horizontal' | string;
  name: string;
  label: string;
  multiple?: boolean; // 控制是否可以增减
  items: Item[]; // 嵌套字段
}
interface DynamicFormListProps {
  formField: Field; // 修改为单个 field
  form?: any;
}

const DynamicFormList: React.FC<DynamicFormListProps> = ({ formField, form }) => {
  const renderField = (item: Item) => {
    switch (item.type) {
      case 'text':
        return <Input />;
      case 'number':
        return <Input type={item.type} />;
      case 'select':
        return (
          <Select>
            {item.options?.map(option => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        );
      case 'radio':
        return (
          <Radio.Group>
            {item.options?.map(option => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'switch':
        return <Switch />;
      default:
        return null;
    }
  };

  // const renderFormList = (items: Item[]) => {
  //   return items.map(item => (
  //     <Form.Item key={item.name} label={item.label} name={item.name}>
  //       {renderField(item)}
  //     </Form.Item>
  //   ));
  // }




  return (
    <>
      <Form.List name={formField.name}>
        {(fields, { add, remove }) => {
          console.log('fields:', fields);
          return <>
            {fields.map(({ key, name, fieldKey, ...restField }) => {
              console.log('key:', key);
              console.log('name:', name);
              console.log('fieldKey:', fieldKey);
              console.log('restField:', restField);
              console.log('formField:', formField);

              if (formField.layout === 'inline') {
                return <Space key={key}>
                  {formField.items.map(item => (
                    <Form.Item key={item.name + key} label={item.label} name={[formField.name, item.name]}>
                      {renderField(item)}
                    </Form.Item>
                  ))}

                  <Button type="link" onClick={() => remove(name)}>
                    删除
                  </Button>

                </Space>
              }
              // return <div key={key}>
              //   <Form.Item
              //     {...restField}
              //     name={[name, 'value']}
              //     fieldKey={[key, 'value']}
              //     label={formField.label}
              //   >
              //     {formField.items.map(item => (
              //       <Form.Item key={item.name} label={item.label} name={[name, item.name]}>
              //         {renderField(item)}
              //       </Form.Item>
              //     ))}
              //   </Form.Item>
              //   {formField.multiple && (
              //     <Button type="link" onClick={() => remove(name)}>
              //       删除
              //     </Button>
              //   )}
              // </div>
            }
            )}

            <Button type="dashed" onClick={() => add()} block>
              添加 {formField.label}
            </Button>

          </>
        }}
      </Form.List>
    </>

  );
};

export default DynamicFormList;
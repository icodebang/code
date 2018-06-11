#!/bin/sh
mysql -u root -proot -Dtongxinonlinev1 << EOF >> /tmp/mysql_test.log
#UPDATE tx_account_subject_general SET code = '5802' WHERE id = 559;
#ALTER TABLE tx_account_subject_general ADD UNIQUE( code, criterion);
EOF
#x=1001
#while [ $x -le 1999 ]

#do
#mysql -u root -proot  -Dtongxinonlinev1 << EOF >> /tmp/mysql_test.log
#INSERT INTO tx_account_subject_general (category, category_id, pid, level, path, code, name, unit, direction, criterion, side, available)
#VALUES
#        (1, 11, 0, 1, '/0/', $x, '科目_$x', '', 0, 1, 0, 1);

#EOF
#x=`expr $x + 1`
#done
x=10010001
while [ $x -le 10019999 ]

do
mysql -u root -proot -Dtongxinonlinev1 << EOF >> /tmp/mysql_test.log
INSERT INTO tx_account_subject_general (category, category_id, pid, level, path, code, name, unit, direction, criterion, side, available)
VALUES
        (1, 11, 1, 2, '/0/1/', $x, '科目_$x', '', 0, 1, 0, 1);

EOF
x=`expr $x + 1`
done



exit 0;
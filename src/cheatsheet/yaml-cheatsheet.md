# YAML Cheatsheet

## What is YAML

- Data serializaion language (like XML and JSON)
- Standard format to transfer data
- Extensions : .yaml and .yml
- YAML is a superset of JSON: any valid JSON file is also a valid YAML file
- Data structures defined in line separation and indentation

## YAML Use Cases

- Docker-compose, Ansible, Kubernetes and many more

## Key value pairs

```yml
app: user-authentication
port: 9000
# A comment
version: 1.7
# A second comment
```

- For strings, you can use either double quotes, single quotes or no quotes at all. If you use \n, you have to use double quotes or YAML don't recognize it.

## Objects

```yml
microservice:
  app: user-authentication
  port: 9000
  version: 1.7
```

- The space has to be the exact same for each attribute between objects. You can use an online YAML validator because it is sensitive about those spaces.

## Lists & Boolean

```yml
microservice:
  - app: user-authentication
    port: 9000
    version: 1.7
    deployed: false # yes and no, on and off works too
    versions:
    - 1.9
    - 2.0
    - 2.1 # You can use lists inside of list items, always align them.
  - app: shopping-cart
    port: 9002
    versions: [2.4, 2.5, "hello"]
    # You can use arrays instead, and have a mix of numbers and strings. 

microservices: 
  - user-authentication
  - shopping-cart
```

### Boolean pitfalls:

```yaml
yes: true  # Interpreted as boolean true
no: false  # Interpreted as boolean false
on: true   # Also interpreted as true
off: false # Also interpreted as false
```

If you actually want "yes", "no", "on" and "off" as strings, quote them:

```yaml
user-input: "yes"  # String, not a boolean
```

### Use !!str, !!int and !!bool for Explicit Types

Sometimes YAML thinks it knows what you mean. Force it to behave.

```yaml
bad-example: 00123   # YAML assumes this is an octal number (!!!)
good-example: !!str "00123"  # Now it's a string, not octal
```

## Real Kubernetes YAML Configuration Example

- Key-value pairs
- metadata: object
- labels: object
- spec: object
- containers: list of objects
- ports: list
- volumeMounts: list of objects

```yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
  spec:
    containers:
    - name: nginx-container
      image: nginx
      ports:
      - containerPort: 80
      volumeMounts:
      - name: nginx-vol
        mountPath: /usr/nginx/html
    - name: sidecar-container
      image: curlimages/curl
      command: ["/bin/sh"]
      args: ["-c", "echo Hello from the sidecar container; sleep 300"]
```

## Multi Line Strings

```yml
multilineString: |
  this is a multiline String
  and this is the next line.
  next line

singlelineString: >
  this is a single line String
  that should be all on one line.
  some other stuff
```

- Use | pipes if you want YAML to interpret this as multi line text. The line breaks will stay.
- Greater than sign > will be interpreted as a single line.

### Real Kubernetes examples

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mosquito-config-file
data:
  mosquito.conf: |
    log_dest stdout
    log_type all
    log_timestamp true
    listener 9001
```

- You can put a whole shell script inside a YAML file.

```yml
command:
  - sh
  - -c
  - |
    http () {
        local path="${1}"
        set -- -XGET -s --fail
        curl -k "$@" "http://localhost:5601${path}"
    }
    http "/app/kibana"
```

## Environment Variables

- You can access them using a dollar sign inside your YAML configuration.

```yml
command:
  - /bin/sh
  - -ec
  - >-
    mysql -h 127.0.0.1 -u root -p$MYSQL_ROOT_PASSWORD -e 'SELECT 1'
```

## Placeholders

- Instead of directly defining values, you can put placeholders with double brackets. It gets replaced using a template generator.

```yml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.service.name }}
spec:
  selector:
    app: {{ .Values.service.app }}
  ports:
    - protocol: TCP
      port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.targetport }}
```

## YAML Anchors & Aliases (DRY Principle)

YAML lets you reuse values using anchors (&) and aliases (*)

```yaml
default-config: &default
  app: user-authentication
  port: 9000
  version: 1.7

microservice:
  - <<: *default  # Reuses the default config
    deployed: false
  - app: shopping-cart
    port: 9002
    version: 2.4
```

### Merge Keys (Combine Multiple Defaults)

Anchors can also be merged into objects:

```yaml
common-config: &common
  logging: true
  retries: 3

extra-config:
  <<: *common  # Merges the common config
  retries: 5  # Overrides specific values
```

## Multiple YAML documents

- This is especially useful when you have multiple components for one service. Separate them with three dashes.

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mosquito-config-file
data:
  mosquito.conf: |
    log_dest stdout
    log_type all
    log_timestamp true
    listener 9001

---
apiVersion: v1
kind: Secret
metadata:
  name: mosquito-secret-file
type: Opaque
data:
  secret.file: |
    cbdfdfg654fgdfg6f5sb132v1f6sg854g6s8g66IYUHGFKJHGVfd21=
```

- In Kubernetes, you can use both YAML or JSON, but YAML is cleaner and more readable.

## YAML Linting Tools

A CLI tool:
[yamllint](https://github.com/adrienverge/yamllint)

`kubectl apply --dry-run=client -f file.yaml` 
(Validates YAML syntax for Kubernetes)
